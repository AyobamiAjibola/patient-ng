import { appModelTypes } from './app-model';
import Permission from '../models/Permission';
import type { Fields, Files } from 'formidable';
import type { Attributes } from 'sequelize';
import IncomingForm from 'formidable/Formidable';
import User from '../models/Restaurant';
import { Response, Request, NextFunction } from 'express';
 
import CheckList from '../models/CheckList';
import Transaction from '../models/Transaction';

export declare namespace appCommonTypes {
  import IPermission = appModelTypes.IPermission;

  type DatabaseEnv = 'development' | 'production' | 'test';

  type Roles = 'OWNER' | 'MANAGER' | 'SUPERVISOR'
  type Permissions = 
  'owner'
  | 'manager'
  | 'supervisor'
  // | 'update_category'
  // | 'delete_category'
  // | 'create_menu'
  // | 'read_menu'
  // | 'update_menu'
  // | 'delete_menu'
  // | 'create_cuisine'
  // | 'read_cruisine'
  // | 'update_cruisine'
  // | 'delete_cuisine'
  // | 'create_dish'
  // | 'read_dish'
  // | 'update_dish'
  // | 'delete_dish'
  // | 'create_deal'
  // | 'read_deal'
  // | 'update_deal'
  // | 'delete_deal'

  type CustomJwtPayload = JwtPayload & AuthPayload;
  
  type AuthPayload = {
    userId: string;
    customer?: string;
  };

  type AppRequestParams = {
    customerId: string;
    appointmentId: string;
    driverId: string;
  };

  type QueueMailTypes = 'DEFAULT' | 'WEBSITE' | 'BOOKING' | 'CUSTOMER';
  type AnyObjectType = { [p: string]: any };

  interface DatabaseConfig {
    host?: string;
    username?: string;
    password?: string;
    port?: string;
    dialect?: string;
    database?: string;
  }

  interface AppSettings {
    paystack: {
      apiKey: string
    };
    redis: Record<DatabaseEnv, DatabaseConfig>;
    mongo: Record<DatabaseEnv, DatabaseConfig>;
    queue: Record<DatabaseEnv, DatabaseConfig>;
    roles: Roles[];
    permissions: Permissions[];
    service: {
      port: string;
      env: string;
      apiRoot?: string;
    };
    jwt: { key: string; expiry: string };
    jwtAccessToken: { key: string; expiry: string };
    jwtRefreshToken: { key: string; expiry: string };
    twilio: {
      twilioSid: string;
      twilioAuthToken: string;
      phoneNumber: string;
    };
    nodemailer: {
      email: string;
      password: string;
      service: string;
      host: string;
      port: any;
      secure: any;
    },
    // googleOAuth: {
    //   google_client_id: string,
    //   google_client_secret: string,
    //   google_callbackURL: string
    // },
    // facebookAuth: {
    //   client_ID: string,
    //   client_secret: string,
    //   facebook_callbackURL: string
    // },
    // instagramAuth: {
    //   client_ID: string,
    //   client_secret: string,
    //   instagram_callbackURL: string
    // },
    rabbitMq: {
      connection: string
    }
  }

  interface HttpResponse<T> {
    message: string;
    code: number;
    timestamp?: string;
    result?: T | null;
    results?: T[];
    tokens?: {
      accessToken: string,
      refreshToken: string
    }
  }

  type AsyncWrapper = (req: Request, res: Response, next: NextFunction) => Promise<void>;

  interface RouteEndpointConfig {
    name: string;
    path: string;
    method: string;
    handler: AsyncWrapper;
    hasRole?: string;
    hasAuthority?: string;
    hasAnyRole?: string[];
    hasAnyAuthority?: string[];
  }

  type RouteEndpoints = RouteEndpointConfig[];

  interface RedisDataStoreOptions {
    PX: number | string; //Expiry date in milliseconds
  }

  interface BcryptPasswordEncoder {
    encode(rawPassword: string): Promise<string>;

    match(rawPassword: string, hash: string): Promise<boolean>;
  }

  interface QueueEvents {
    name: QueueMailTypes;
  }

  interface MailTextConfig {
    message: string,
    subText?: string
  }
}

declare global {
  namespace Express {
    export interface Request {
      files: Files;
      fields: Fields;
      permissions: Attributes<Permission>[];
      user: User;
      form: IncomingForm;
      jwt: string;
      subscription: any;
      jwtToken: string;
      data: string;
    }
  }
}
