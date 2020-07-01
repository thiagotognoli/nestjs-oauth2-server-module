import { EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateClientCommand } from "./create-client.command";
import { ClientEntity, ClientRepositoryInterface } from "../../domain";
export declare class CreateClientHandler implements ICommandHandler<CreateClientCommand> {
    private readonly clientRepository;
    private readonly eventBus;
    constructor(clientRepository: ClientRepositoryInterface, eventBus: EventBus);
    /**
     * Execute the create Client Command
     *
     * @param command
     */
    execute(command: CreateClientCommand): Promise<ClientEntity>;
}
