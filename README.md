# final-year-project

## Notes

In:

> **node_modules/react-native-leaderboard/index.js**

you need to change how ViewPropTypes is imported. Specifically, change:

```javascript
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from "react-native";
```

to:

```javascript
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ViewPropTypes } from "deprecated-react-native-prop-types";
```
