- need to persist animated state outside of controls
  - rerenders are fucking shit up shit
  - specifically need to use redux without rerendering things that i don't want to
    - for example, adding a layer concurenly while doing another animation
    - cursors can't reset as they might
  - serialize layers
  - cursors can't be stateful, or else every cursor movement would
  - be a new rendering of state

- on als tparragraph, all cursors shoudl arange in sgn wave or circle rotating and wave emoji 

cursors and other animatables should be memoized?
or simply not stateful?
