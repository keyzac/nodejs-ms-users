import 'reflect-metadata';
import { AdvertiseModel } from '../AdvertiseModel';

describe('Unit test AdvertiseModel', () => {
  let instance;
  let sequelizeMock;

  beforeEach(() => {
    sequelizeMock = {
      define: jest.fn().mockReturnValue({})
    };
    instance = new AdvertiseModel(sequelizeMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Method getModel', () => {
    test('Get advertise model', () => {
      const model = instance.getModel();
      expect(sequelizeMock.define).toBeCalled();
      expect(sequelizeMock.define.mock.calls[0][0]).toEqual('advertise');
      expect(sequelizeMock.define.mock.calls[0][1]).toHaveProperty('id');
      expect(sequelizeMock.define.mock.calls[0][2]).toEqual({
        tableName: 'npc_aviso',
        timestamps: false
      });
      expect(model).toEqual({});
    });
  });
});
