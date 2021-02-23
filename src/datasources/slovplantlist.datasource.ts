import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'slovplantlist',
  connector: 'mysql',
  url: '',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class SlovplantlistDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'slovplantlist';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.slovplantlist', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
