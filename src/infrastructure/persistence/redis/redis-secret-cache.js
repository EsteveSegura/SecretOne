const SecretCache = require('../../../domain/secret/service/secret-cache');

class RedisSecretCache extends SecretCache {
  constructor({redisHandler, promisify,secretRedisParser}) {
    super();
    this.redisHandler = redisHandler;
    this._promisify = promisify;
    this.secretRedisParser = secretRedisParser;
  }

  async delete(id) {
    const client = await this.redisHandler.getClient();
    const asyncDelete = this._promisify(client.del).bind(client);
    
    try {
      await asyncDelete(id);
      console.log('delete')
    } catch (err) {
      throw new Error('Cant delete secret');
    }
  }

  async findById(id) {
    const client = await this.redisHandler.getClient();
    const asyncGet = this._promisify(client.get).bind(client);
    
    try {
      const secretRawJson = await asyncGet(id);
      const parseJsonToDomain = this.secretRedisParser.toDomain(JSON.parse(secretRawJson));
      
      return parseJsonToDomain
    } catch (err) {
      throw new Error('Cant find secret');
    }
  }

  async save(secret) {
    const client = await this.redisHandler.getClient();
    const asyncSet = this._promisify(client.set).bind(client);
    
    try {
      await asyncSet(secret.id, JSON.stringify(secret), 'PX', 1000*60*5);
    } catch (err) {
      console.log(err)
      throw new Error('Cant save secret');
    }
  }
}

module.exports = RedisSecretCache;
