# react-native-tensorio-tensorflow

Tensor/IO for React Native with the TensorFlow backend

## Installation

```sh
npm install react-native-tensorio-tensorflow
```

You may need to increase the amount of heap memory available to the JVM. If you get an error when you build your application with something about the "Java heap space" add the following to your *gradle.properties*:

```gradle
org.gradle.jvmargs=-Xms512M -Xmx4g -XX:MaxPermSize=1024m -XX:MaxMetaspaceSize=1g -Dkotlin.daemon.jvm.options="-Xmx1g"
```

## Usage

```js
import TensorioTensorflow from "react-native-tensorio-tensorflow";

// ...

const result = await TensorioTensorflow.multiply(3, 7);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
