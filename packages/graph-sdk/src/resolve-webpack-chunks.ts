import Resolver from './resolver';
import Container from './container';
import Network from './network';

export default class ResolveWebpackChunks implements Resolver {
  private container: Container;

  async resolve(key: string) {
    switch (key) {
      case 'network': {
        const { default: DefaultNetwork } = await import(
          /* webpackChunkName: "network" */ './default-network'
        );
        const service: Network = new DefaultNetwork();
        service.setContainer(this.container);
        return service;
      }
      default:
        break;
    }

    return undefined;
  }

  setContainer(container: Container) {
    this.container = container;
  }
}
