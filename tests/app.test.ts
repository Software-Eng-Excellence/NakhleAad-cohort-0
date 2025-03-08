import {FinanceCalculator, Order, OrderManagement, Validator} from '../src/app';

describe('OrderManagement', () => {
    // before all, new validator and new calculator
    // beforeEach, new OrderManagement
    let validator: Validator;
    let calculator: FinanceCalculator;
    let orderManager: OrderManagement;
    let baseValidator:(order: Order) => void;

    beforeAll(() => {
        validator = new Validator([]);
        calculator = new FinanceCalculator();
    });
    beforeEach(() => {
        baseValidator = validator.validate;
        validator.validate = jest.fn();
        orderManager = new OrderManagement(validator, calculator);
    });
    afterEach(() => {
        validator.validate = baseValidator;
    });
    it('should add an order', () => {
        // Arrange
        const item = 'Sponge';
        const price = 15;

        // Act
        orderManager.addOrder(item, price);

        // Assert
        expect(orderManager.getOrders()).toEqual([{ id: 1, item, price }]);
    });
    it('should call finance calculator getRevenue', () => {
        // Arrange
        const item = 'Sponge';
        const price = 15;
        orderManager.addOrder(item, price);
        const spy = jest.spyOn(calculator, 'getRevenue');

        // Act
        orderManager.getTotalRevenue();

        // Assert
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith([{ id: 1, item, price }]);
        expect(spy).toHaveReturnedWith(15);
    });
    it("should throw addition exception if validator does not pass", () => {
        // Arrange
        const item = 'Sponge';
        const price = 15;
        (validator.validate as jest.Mock).mockImplementation(() => {
            throw new Error('Invalid order');
        });

        // Act and Assert
        expect(() => orderManager.addOrder(item, price)).toThrow('[OrderManagement] Error adding order Invalid order');

    });

    it('should get an order', () => {
        // Arrange
        const item = 'Sponge';
        const price = 15;
        orderManager.addOrder(item, price);

        // Act
        const order = orderManager.getOrder(1);

        // Assert
        expect(order).toEqual({ id: 1, item, price });
    });
});

describe("FinanceCalculator", () => {
    it('should calculate revenue', () => {
        // Arrange
        const calculator = new FinanceCalculator();
        const orders = [
            { id: 1, item: 'Sponge', price: 15 },
            { id: 2, item: 'Soap', price: 10 },
            { id: 3, item: 'Shampoo', price: 20 },
        ];

        // Act
        const revenue = calculator.getRevenue(orders);

        // Assert
        expect(revenue).toBe(45);
    });
    it('should calculate average buy power', () => {
        // Arrange
        const calculator = new FinanceCalculator();
        const orders = [
            { id: 1, item: 'Sponge', price: 15 },
            { id: 2, item: 'Soap', price: 10 },
            { id: 3, item: 'Shampoo', price: 20 },
        ];

        // Act
        const averageBuyPower = calculator.getAverageBuyPower(orders);

        // Assert
        expect(averageBuyPower).toBe(15);
    });
    
});