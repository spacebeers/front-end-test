import { h } from 'preact';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import { RatingComponent, stringToNumber } from './rating.component';

configure({ adapter: new Adapter })

describe('RatingComponent', () => {
    it('should display the correct star rating', async () => {
        const rating_component_five = mount(<RatingComponent rating="5" />)
        const rating_component_three = mount(<RatingComponent rating="3" />)

        expect(rating_component_five.find('svg').length).toBe(5)
        expect(rating_component_three.find('svg').length).toBe(3)
    })

    it('should default to 0', async () => {
        const rating_component = mount(<RatingComponent rating="test" />)

        expect(rating_component.find('svg').length).toBe(0)
    })
})

describe('stringToNumber', () => {
    it('stringToNumber("test") should be true', () => {
        expect(stringToNumber("test")).toBe(NaN);
    });

    it('stringToNumber("1000") should be true', () => {
        expect(stringToNumber("1000")).toBe(1000);
    });

    it('stringToNumber("1000abc") should be true', () => {
        expect(stringToNumber("1000abc")).toBe(1000);
    });

    it('stringToNumber("abc1000") should be true', () => {
        expect(stringToNumber("abc1000")).toBe(NaN);
    });
});

