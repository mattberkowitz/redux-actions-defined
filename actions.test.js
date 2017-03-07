import { createAction, getActionSchema, clearActions } from './actions';
import { String, Array, Object } from './types';

afterEach(() => {
  clearActions();
})

describe('createAction', () => {
  test('creating an action returns type, schema, and creator for action. schema can be retrieved with getActionSchema', () => {
    const { type, schema, creator } = createAction('testAction', {
      test1: String,
      test2: Array.ofType(String),
    });

    expect(type).toBe('testAction');
    expect(schema).toBe(getActionSchema(type));
    expect(creator({
      test1: 'foo',
      test2: ['bar'],
    })).toMatchObject({
      type: 'testAction',
      payload: {
        test1: 'foo',
        test2: ['bar'],
      }
    })
  });

  test('attempting to create an already existing action will return null and not overwrite existing schema', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const testAction = createAction('testAction', {
      test1: String,
      test2: Array.ofType(String),
    });

    const testAction2 = createAction('testAction', {
      foo: String,
      bar: String
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('An action with type "testAction" already exists');

    expect(testAction2).toBeNull()

    expect(getActionSchema('testAction')).toBe(testAction.schema);

    consoleErrorSpy.mockReset();
    consoleErrorSpy.mockRestore();
  });
})
