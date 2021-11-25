import { expect } from 'chai'

import { AssetId } from '../../../src/model'
import { AggregatePriceRepository } from '../../../src/peripherals/database/AggregatePriceRepository'
import { Logger } from '../../../src/tools/Logger'
import { setupDatabaseTestSuite } from './setup'

describe('AggregatePriceRepository', () => {
  const { knex } = setupDatabaseTestSuite()

  it('can delete all records', async () => {
    const repository = new AggregatePriceRepository(knex, Logger.SILENT)
    await repository.deleteAll()
    const results = await repository.getAll()
    expect(results).to.deep.equal([])
  })

  it('can add new records and query them by block number', async () => {
    const repository = new AggregatePriceRepository(knex, Logger.SILENT)
    await repository.deleteAll()

    const itemA = {
      blockNumber: 1234n,
      assetId: AssetId.WETH,
      priceUsd: 2137n,
    }
    const itemB = {
      blockNumber: 1234n,
      assetId: AssetId.DAI,
      priceUsd: 1n,
    }
    const itemC = {
      blockNumber: 4567n,
      assetId: AssetId.DAI,
      priceUsd: 2n,
    }

    await repository.addOrUpdate([itemA, itemB, itemC])

    const resultsA = await repository.getAllByBlockNumber(1234n)
    expect(resultsA).to.have.deep.members([itemA, itemB])

    const resultsB = await repository.getAllByBlockNumber(4567n)
    expect(resultsB).to.have.deep.members([itemC])
  })

  it('can add new records and update existing ones', async () => {
    const repository = new AggregatePriceRepository(knex, Logger.SILENT)
    await repository.deleteAll()

    const itemA = {
      blockNumber: 1234n,
      assetId: AssetId.WETH,
      priceUsd: 2137n,
    }
    const itemB = {
      blockNumber: 1234n,
      assetId: AssetId.DAI,
      priceUsd: 1n,
    }

    await repository.addOrUpdate([itemA])

    const resultsBefore = await repository.getAllByBlockNumber(1234n)
    expect(resultsBefore).to.have.deep.members([itemA])

    const itemC = { ...itemA, priceUsd: 420n }
    await repository.addOrUpdate([itemC, itemB])

    const resultsAfter = await repository.getAllByBlockNumber(1234n)
    expect(resultsAfter).to.have.deep.members([itemC, itemB])
  })

  it('getAllByAssetId', async () => {
    const repository = new AggregatePriceRepository(knex, Logger.SILENT)
    await repository.deleteAll()

    await repository.addOrUpdate([
      {
        blockNumber: 1234n,
        assetId: AssetId.WETH,
        priceUsd: 2137n,
      },
      {
        blockNumber: 1235n,
        assetId: AssetId.DAI,
        priceUsd: 420n,
      },
      {
        blockNumber: 1233n,
        assetId: AssetId.DAI,
        priceUsd: 69n,
      },
    ])

    const results = await repository.getAllByAssetId(AssetId.DAI)
    expect(results).to.deep.equal([
      { blockNumber: 1233n, priceUsd: 69n },
      { blockNumber: 1235n, priceUsd: 420n },
    ])
  })
})
