import fetchMock from 'fetch-mock';
import {Hue} from './hue';

describe('Hue', () => {
    beforeEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    describe('Hue.discover()', () => {
        it('it should attempt to discover hubs', () => {
            const expectedResponse = '[ {internalipaddress: \'127.0.0.1\', id: \'somehueid\'} ]';
            fetchMock.getOnce(Hue.DISCOVER_URL, expectedResponse);

            Hue.discover()
                .subscribe(
                    (data) =>
                        expect(data).toEqual(expectedResponse));
        });
    });
});