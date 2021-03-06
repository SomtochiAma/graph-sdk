import Network from '../../src/default-network';
import Container from '../../src/container';
import fetchMock from 'fetch-mock';

describe('Network', () => {
  test('Will perform queries through the exposed module', async () => {
    // Configure the local environment
    const endpoint = 'http://localhost/graphql';
    const apiKey = 'pk.123';
    const container = new Container();
    const network = new Network();
    network.setContainer(container);
    container.apiKey = apiKey;
    container.setParam('@endpoint', endpoint);

    // Add an example query
    const query = `query NumberOfPlacesInItinerary {
      itinerary(id: $itinerary) {
        root {
          placesCount: descendantsCount(type: ItineraryLocation)
        }
      }
    }`;

    // Mock the network call
    fetchMock.mock(`${endpoint}?accessToken=${apiKey}`, {
      data: [{ itinerary: { root: { placesCount: 22 } } }],
    });

    // Perform a network call using our default
    const data = await network.query({ query, variables: { itinerary: 'itinerary/XYZ' } });
    expect(data).not.toBeUndefined();
    expect(data[0].itinerary.root.placesCount).toBe(22);
  });
});
