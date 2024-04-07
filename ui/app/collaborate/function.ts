import { providers, Contract } from "ethers";
import ContractABI from '../../../contract-code/artifacts/contracts/basic-deal-client/DealClient.sol/DealClient.json'

const contractAddress = '0x4E7F4Eeec3a395676861E58389fef1EC8e556f4e';
interface ExtraParamsV1 {
    location_ref: string;
    car_size: number;
    skip_ipni_announce: boolean;
    remove_unsealed_copy: boolean;
}
  
  interface DealRequest {
    piece_cid: string;
    piece_size: number;
    verified_deal: boolean;
    label: string;
    start_epoch: number;
    end_epoch: number;
    storage_price_per_epoch: number; // Use bigint for uint256
    provider_collateral: number; // Use bigint for uint256
    client_collateral: number; // Use bigint for uint256
    extra_params_version: number;
    extra_params: ExtraParamsV1;
  }
const makeDeal = async (cid :string) => {
    if (window.ethereum) {
        try {
            await window.ethereum.enable(); // Request user permission
            const provider = new providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
          
            const contract = new Contract(
                contractAddress,
                //@ts-ignore
                ContractABI,
                provider
            );
            const extra_params: ExtraParamsV1 =  {
                location_ref:"",
                car_size:11,
                skip_ipni_announce:false,
                remove_unsealed_copy:false
            }
            const dealRequest: DealRequest = {
                piece_cid:cid,
                piece_size:256,
                verified_deal:false,
                label:cid,
                start_epoch:2000,
                end_epoch:100000,
                storage_price_per_epoch:0,
                provider_collateral:0,
                client_collateral:0,
                extra_params,
                extra_params_version:1

            }
            const dealId = contract.connect(signer).makeDealProposal(dealRequest)
            return dealId

        } catch (error) {
            //@ts-ignore
            alert("Error: " + error.message);
        }
    } else {
        alert(
            "Please install or enable MetaMask or a Web3-compatible browser extension."
        );
    }
};
export default makeDeal;