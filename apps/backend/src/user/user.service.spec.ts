import { UserService } from './user.service'
import { Test } from '@nestjs/testing'
import { JwtService } from '../jwt/jwt.service'
import { PrismaService } from '../prisma/prisma.service'
import { User } from '@prisma/client'
import { FindUserOutput } from './dto/find-user.dto'

const mockJwtService = () => ({
  sign: jest.fn(() => 'signed-token-baby'),
  verify: jest.fn(),
})

const mockPrismService = {
  user: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
}

describe('UserService (Unit Test)', () => {
  let service: UserService
  let prisma: typeof mockPrismService

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
    prisma = module.get(PrismaService)

    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Find User', () => {
    it('find user by id', async () => {
      const mockUser: User = {
        id: 'asdf',
        createdAt: new Date(),
        email: 'test1@gmail.com',
        nickname: 'test1',
        password: 'testTest1!',
      }
      const output = new FindUserOutput()

      output.ok = true
      output.data = mockUser

      prisma.user.findUnique.mockResolvedValue(mockUser)

      const result = await service.findUserById({ id: 'asdf' })

      expect(result).toEqual(output)
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1)
    })

    it('find all users', async () => {
      const mockUsers: User[] = [
        {
          id: 'a',
          email: 'test1@gmail.com',
          nickname: 'test1',
          password: 'Test1!',
          createdAt: new Date(),
        },
        {
          id: 'b',
          email: 'test2@gmail.com',
          nickname: 'test2',
          password: 'Test2!',
          createdAt: new Date(),
        },
        {
          id: 'c',
          email: 'test3@gmail.com',
          nickname: 'test3',
          password: 'Test3!',
          createdAt: new Date(),
        },
      ]
      prisma.user.findMany.mockResolvedValue(mockUsers)

      const result = await service.getAllUser()

      expect(result).toEqual(mockUsers)
      expect(prisma.user.findMany).toHaveBeenCalledTimes(1)
    })
  })
})
