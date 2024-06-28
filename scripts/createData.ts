import {faker} from '@faker-js/faker'
import type {KeyedObject, SanityDocumentLike, TypedObject} from 'sanity'
import {getCliClient} from 'sanity/cli'

const client = getCliClient()
const TOGGLES_PER_DOCUMENT = 100
const DOCUMENTS = 100

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

  const transaction = client.transaction()

  for (let dataI = 0; dataI < documents.length; dataI++) {
    transaction.create(documents[dataI])
  }

  transaction
    .commit()
    .then((res) => {
      console.log(`Complete!`, res)
    })
    .catch((err) => {
      console.error(err)
    })
}

createData()
