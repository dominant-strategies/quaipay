import { getZone } from './getZone';
import { allNodeData } from '../constants/nodeData';
import { quais } from 'quais';

export function getQuaisProvider() {
  const zone = getZone();
  const nodeData = allNodeData[zone];
  return new quais.providers.JsonRpcProvider(nodeData.provider);
}
