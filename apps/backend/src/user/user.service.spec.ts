import { UserService } from './user.service'
import { Test } from '@nestjs/testing'
import { JwtService } from '../jwt/jwt.service'
import { PrismaService } from '../prisma/prisma.service'
import { User } from '@tumtum/db'
import { FindUserOutput } from './dto/find-user.dto'
import { UserError, UserErrorCode } from '@tumtum/shared'

const mockJwtService = {
  sign: jest.fn(() => 'signed-token-baby'),
  verify: jest.fn(),
}

const mockPrismService = {
  user: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
}

describe('UserService (Unit Test)', () => {
  let service: UserService
  let prismaService: typeof mockPrismService
  let jwtService: typeof mockJwtService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: PrismaService,
          useValue: mockPrismService,
        },
      ],
    }).compile()

    service = module.get<UserService>(UserService)
    prismaService = module.get(PrismaService)
    jwtService = module.get(JwtService)

    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  // describe('create new account', async () => {})

  describe('Find User by id', () => {
    const mockUsers: User[] = [
      {
        id: 'a',
        email: 'test1@gmail.com',
        nickname: 'test1',
        password: 'Test1!',
        jti: '',
        createdAt: new Date(),
      },
      {
        id: 'b',
        email: 'test2@gmail.com',
        nickname: 'test2',
        password: 'Test2!',
        jti: '',
        createdAt: new Date(),
      },
      {
        id: 'c',
        email: 'test3@gmail.com',
        nickname: 'test3',
        password: 'Test3!',
        jti: '',
        createdAt: new Date(),
      },
    ]
    const mockUser = mockUsers[0]

    it('should find an existing user', async () => {
      const output = new FindUserOutput()

      output.ok = true
      output.data = mockUser

      prismaService.user.findUnique.mockResolvedValue(mockUser)

      const result = await service.findUserById({ id: mockUser.id })

      expect(result).toEqual(output)
      expect(prismaService.user.findUnique).toHaveBeenCalledTimes(1)
    })

    it('should fail if no user is found', async () => {
      const output = new FindUserOutput()

      output.ok = false
      output.error = new UserError(UserErrorCode.ID_IS_NOT_EXISTS)

      prismaService.user.findUnique.mockResolvedValue(null)

      const result = await service.findUserById({ id: '1111' })

      expect(result).toEqual(output)
      expect(prismaService.user.findUnique).toHaveBeenCalledTimes(1)
    })

    it('should find all users', async () => {
      prismaService.user.findMany.mockResolvedValue(mockUsers)

      const result = await service.getAllUser()

      expect(result).toEqual(mockUsers)
      expect(prismaService.user.findMany).toHaveBeenCalledTimes(1)
    })
  })

  describe('Create New Account', () => {
    it('should fail if email is exists', () => {})

    it('should fail if password is weak', () => {})

    it('should fail if email is not validate', () => {})

    it('should success if create new account', () => {})
  })
})
