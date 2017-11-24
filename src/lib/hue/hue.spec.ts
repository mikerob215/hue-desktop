import Hue from './hue';
import fetchMock from 'fetch-mock';

describe('Hue', () => {
    beforeEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    describe('Hue.Discover', () => {
        it('it should attempt to discover hubs', () => {
            const expectedResponse = '[ {internalipaddress: \'127.0.0.1\', id: \'somehueid\'} ]';
            fetchMock.getOnce('https://www.meethue.com/api/nupnp/', expectedResponse);

            Hue.discover()
                .subscribe(
                    (data) =>
                        expect(data).toEqual(expectedResponse));
        });
    });
});