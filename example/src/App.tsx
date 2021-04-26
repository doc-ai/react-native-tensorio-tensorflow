import * as React from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import TensorioTensorflow from 'react-native-tensorio-tensorflow';

// @ts-ignore
const { imageKeyFormat, imageKeyData, imageTypeAsset } = TensorioTensorflow.getConstants();

const catImage = Platform.OS === 'ios' ? 'cat' : 'cat.jpg';
const dogImage = Platform.OS === 'ios' ? 'dog' : 'dog.jpg';
const catLabel = 0;
const dogLabel = 1;

export default function App() {
  const [results, setResults] = React.useState<object | undefined>();
  const [trainingLoss, setTrainingLoss] = React.useState<object | undefined>();

  React.useEffect(() => {
    
    // Prediction
    
    TensorioTensorflow.load('cats-vs-dogs-predict.tiobundle', 'classifier');
    
    TensorioTensorflow
      .run('classifier', {
        'image': {
          [imageKeyFormat]: imageTypeAsset,
          [imageKeyData]: catImage
        }
      })
      .then(output => {
        console.log(output);
        // @ts-ignore
        return output['sigmoid'];
      })
      .then(setResults)
      .catch(error => {
        console.log(error)
      });

    TensorioTensorflow.unload('classifier');

    // Training

    TensorioTensorflow.load('cats-vs-dogs-train.tiobundle', 'trainable');
    
    const batch = [
      {
        'image': {
          [imageKeyFormat]: imageTypeAsset,
          [imageKeyData]: catImage
        },
        'labels': catLabel
      },
      {
        'image': {
          [imageKeyFormat]: imageTypeAsset,
          [imageKeyData]: dogImage
        },
        'labels': dogLabel
      }
    ]

    TensorioTensorflow
      .train('trainable', batch)
      .then(output => {
        console.log(output);
        // @ts-ignore
        return output['sigmoid_cross_entropy_loss/value'];
      })
      .then(setTrainingLoss)
      .catch(error => {
        console.log(error)
      });

    TensorioTensorflow.unload('trainable');

  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {JSON.stringify(results, null, 2)}</Text>
      <Text>Training Loss: {JSON.stringify(trainingLoss, null, 2)}</Text>
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
