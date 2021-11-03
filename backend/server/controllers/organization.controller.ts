import { Request, Response, NextFunction, Router } from 'express'; 
import { Organization } from '../entity/organization';
import { CrudController, IController, ICrudController } from './crud.controller';

/**
 * The interface to use for every Bird Controller.
 */
export interface IOrganizationController extends ICrudController, IController  {
    
}

export class OrganizationController extends CrudController<Organization> implements IOrganizationController {
    public router = Router();

    constructor() {
        super(Organization); // Initialize the parent constructor

        this.router.get('', this.all);
        this.router.get('/:id', this.one);
        this.router.post('', this.save);
    }
}