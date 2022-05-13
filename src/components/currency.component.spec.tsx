import { h } from 'preact';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import { CurrencyComponent } from './currency.component';

configure({ adapter: new Adapter })

describe('CurrencyComponent', () => {
    it('should display the correctly formatted price', async () => {
        const currency_component = mount(<CurrencyComponent price={1234.56} />)

        expect(currency_component.find('span').length).toBe(1)
        expect(currency_component.find('span').text()).toBe("£1,234.56")
    })
})