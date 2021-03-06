import { defineAction } from '../actions';
import { getRawActionSchema, clearActions } from '../action-store';
import { types } from 'type-definitions';

afterEach(() => {
  clearActions();
})

describe('defineAction', () => {
  test('creating an action returns type, schema, and creator for action. schema can be retrieved with getActionSchema', () => {
    const { type, schema, creator } = defineAction('testAction', {
      test1: types.String,
      test2: types.Array.ofType(types.String),
    });

    expect(type).toBe('testAction');
    expect(schema).toBe(getRawActionSchema(type));
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

    const testAction = defineAction('testAction', {
      test1: types.String,
      test2: types.Array.ofType(types.String),
    });

    const testAction2 = defineAction('testAction', {
      foo: types.String,
      bar: types.String
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('An action with type "testAction" already exists');

    expect(testAction2).toBeNull()

    expect(getRawActionSchema('testAction')).toBe(testAction.schema);

    consoleErrorSpy.mockReset();
    consoleErrorSpy.mockRestore();
  });
})
