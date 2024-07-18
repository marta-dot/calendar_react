// const pg = require('pg');
import pg from 'pg';

// module.exports = class DatabaseAdapter {
export default class DatabaseAdapter {
  constructor() {
    console.log('git')
    this.client = new pg.Client({
      user: 'postgres.atqbodscjmzpsqlcftib',
      password: 'aSS.YLhHn49NjAm',
      host: 'aws-0-eu-central-1.pooler.supabase.com',
      port: 6543,
      database: 'postgres',
    })
    console.log('not git')
  }

  async query(query, params) {
    await this.client.connect()

    let res = []
    try {
       res = await this.client.query(query, params)
    } catch (e) {
      console.log(e)
    } finally {
      await this.client.end()
    }

    return res
  }
}






