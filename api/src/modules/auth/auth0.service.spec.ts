import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { Auth0Service } from './auth0.service';

describe('Auth0Service', () => {
  let service: Auth0Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Auth0Service,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue(
              'test-domain.auth0.com',
            ),
          },
        },
      ],
    }).compile();

    service = module.get(Auth0Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
