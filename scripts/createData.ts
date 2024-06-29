import {faker} from '@faker-js/faker'
import type {KeyedObject, SanityDocumentLike, TypedObject} from 'sanity'
import {getCliClient} from 'sanity/cli'

const client = getCliClient()
const TOGGLES_PER_DOCUMENT = 1000
const DOCUMENTS = 1000
const SLICE_SIZE = 25

async function createData() {
  console.log(`Create new data with...`)
  console.log(`Project ID: ${client.config().projectId}`)
  console.log(`Dataset: ${client.config().dataset}`)

  await client.delete({query: '*[_type == "toggleGroup"]'})

  const documents: SanityDocumentLike[] = []

  for (let documentI = 0; documentI < DOCUMENTS; documentI++) {
    const toggles: (KeyedObject & TypedObject)[] = []

    for (let toggleI = 0; toggleI < TOGGLES_PER_DOCUMENT; toggleI++) {
      toggles.push({
        _key: faker.string.uuid(),
        _type: 'toggle',
        enabled: faker.datatype.boolean(),
      })
    }

    documents.push({
      _id: faker.string.uuid(),
      _type: 'toggleGroup',
      toggles,
    })
  }

  for (let i = 0; i < documents.length; i += SLICE_SIZE) {
    const transaction = client.transaction()

    // Get the batch of documents
    const batch = documents.slice(i, i + SLICE_SIZE)

    // Create each document in the batch
    for (let dataI = 0; dataI < batch.length; dataI++) {
      transaction.create(batch[dataI])
    }

    // Commit the transaction for the current batch
    try {
      const res = await transaction.commit()
      console.log(`Batch committed successfully!`, res)
    } catch (err) {
      console.error(`Error committing batch:`, err)
    }
  }

  console.log('All documents processed!')
}

createData()
