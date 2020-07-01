import { ClientRepositoryInterface, ClientEntity } from "../../domain";
import { Repository } from "typeorm";
export declare class ClientRepository implements ClientRepositoryInterface {
    private readonly repository;
    constructor(repository: Repository<ClientEntity>);
    find(id: string): Promise<ClientEntity>;
    findByClientId(clientId: string): Promise<ClientEntity>;
    findByName(name: string): Promise<ClientEntity>;
    create(client: ClientEntity): Promise<ClientEntity>;
    delete(client: ClientEntity): Promise<ClientEntity>;
}
