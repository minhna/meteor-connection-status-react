# Meteor connection status

A React component shows current DDP connection status and allows to reconnect to Meteor back-end.

![screen shoot](https://user-images.githubusercontent.com/1144332/277763783-1f6d7906-b7e2-4922-96e4-02c4bc7a2161.png)

## Add to your meteor project

`meteor add minhna:connection-status-react`

Add to your react app:

```
import { ConnectionStatus } from "meteor/minhna:connection-status-react";

export const App = () => (
  <>
    ...
    <ConnectionStatus />
  </>
)

```

### Component props

```
  className?: string;
  style?: React.CSSProperties & {
    wrapper?: React.CSSProperties;
    statusContainer?: React.CSSProperties;
    retryContainer?: React.CSSProperties;
    connectBtn?: React.CSSProperties;
  };
  words?: {
    retryIn?: string;
    connectNow?: string;
    second?: string;
    seconds?: string;
  } & { [key in DDP.Status]?: string };
```

- `className`: css class of the wrapper div element
- `style`: overwrite the default styles
- `words`: overwrite the default words

## TODO

- Write some tests
