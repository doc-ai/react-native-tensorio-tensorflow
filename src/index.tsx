import { NativeModules } from 'react-native';

type TensorioTensorflowType = {
  multiply(a: number, b: number): Promise<number>;
};

const { TensorioTensorflow } = NativeModules;

export default TensorioTensorflow as TensorioTensorflowType;
