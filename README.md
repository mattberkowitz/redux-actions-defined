# react-actions-defined

A library for adding definition for actions in redux

** PLEASE NOTE: This is an early, prerelease pacakge it is subject to (and will likely) change. **

This library leverages [type-definitions](https://www.npmjs.com/package/type-definitions) for defining actions


## Defining actions
To define a simple action that takes a payload of a string:

```javascript
import { defineAction } from 'redux-actions-defined';

const { action, schema, creator } = defineAction('test-action', String);
```

#### More complex payloads

Similarly, you can define complex objects and arrays

```javascript
import { defineAction } from 'redux-actions-defined';
import { types, optional } from 'type-definitions';

const { action, schema, creator } = defineAction('test-action', {
  id: optional(Number),
  value: {
    a: Number
    b: String,
    c: [String]
  },
  foo: types.Any.optional
});
```

this would accept payloads like:

```javascript
{
  id: 1,
  value: {
    a: 1,
    b: 'test',
    c: ['test2', 'test3']
  }
}
```

but reject

```javascript
{
  value: {
    a: 'not-a-nubmer',
    b: 'test',
    c: ['test2', 'test3']
  },
  foo: '!!!'
}
```

since value.a does not meet the Number condition

`defineAction` returns an object with three properties

- `type` - The string action name
- `schema` - The schema used to validate the payload
- `creator` - a creator function, it takes a `payload` argument and returns an object in the form of `{ type: type, payload: payload }`, emitting an error to the console if the provided payload does not match the specified schema

#### Defining your own creator

Sometimes you want define a creator that, rather than just taking a constructed payload, takes arguments and constructs a payload for you. You can do this by calling the `.newCreator` function of the `defineAction()` `creator`.

```javascript
const { type, creator } = defineAction('test-action', {
  id: Number,
  value: String
});

const randomValueCreator = creator.newCreator((id) => {
  id,
  value: Math.random()
})
```

the callback passed to `newCreator` should return a properly constructed payload, which will be validated in the same way calling the initially generated creator would have been. Consequently `randomValueCreator` defined above will error since `value` is not a string.


#### Redefinition protection
This module keeps track of defined actions so if you try and define an action with the same type key else where it will let you know!


## Middleware

You can include the provided middleware which will error in the console when either an action that hasn't been defined, or one that is sent with an invalid payload is dispatched

**Future optimization: Currently there is no way to define action types to ignore from the middleware. So actions used by plugins (which you wouldn't expect to define) will error**

```javascript
import reducer from './somewhere'
import { applyMiddleware, createStore } from 'redux';
import { reduxActionsDefinedMiddleware } from 'redux-actions-defined';

const store = createStore(
  reducer,
  applyMiddleware(reduxActionsDefinedMiddleware())
);
```

## Reducer helper

Also included is a helper for constructing multi action reducers. It takes an has map in the form

```javascript
import { createReducer } from 'redux-actions-defined';

createReducer({
  action_type: function (state, action) {
    // do something
    return state;
  }
})
```

it will route the action to the appropriate function based on type, returning the state, unmodified, if the action type does not match any of the functions in the provided hash




## Prior art
This was very much based on https://github.com/modernserf/redux-action-schema since I didn't love the array-style schema definitions
