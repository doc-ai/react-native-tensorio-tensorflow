import * as React from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import TensorioTensorflow from 'react-native-tensorio-tensorflow';

// @ts-ignore
const { imageKeyFormat, imageKeyData, imageTypeAsset } = TensorioTensorflow.getConstants();
const imageAsset = Platform.OS === 'ios' ? 'cat' : 'cat.jpg';

export default function App() {
  const [results, setResults] = React.useState<object | undefined>();

  React.useEffect(() => {
    TensorioTensorflow.load('cats-vs-dogs-predict.tiobundle', 'classifier');
    
    TensorioTensorflow
      .run('classifier', {
        'image': {
          [imageKeyFormat]: imageTypeAsset,
          [imageKeyData]: imageAsset
        }
      })
      .then(output => {
        // @ts-ignore
        return output['sigmoid'];
      })
      .then(setResults)
      .catch(error => {
        console.log(error)
      });

      TensorioTensorflow.unload('classifier');
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {JSON.stringify(results, null, 2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
