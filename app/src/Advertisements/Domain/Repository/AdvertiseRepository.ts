import { Advertise } from '../Entities/Advertise';
import { AdvertiseResponseDto } from '../../Application/Dto/AdvertiseResponseDto';

export interface AdvertiseRepository {
  update(advertise: Advertise): Promise<AdvertiseResponseDto>;
}
