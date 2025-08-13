import { Injectable, InternalServerErrorException } from '@nestjs/common'
import {
  createFailedOutput,
  createSuccessOutput,
  GetAllMissionsOutput,
} from '@tumtum/shared'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class MissionService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllMissions(userId: string): Promise<GetAllMissionsOutput> {
    try {
      const result = await this.prismaService.mission.findMany({
        select: {
          id: true,
          title: true,
          due_date: true,
          priority_level: true,
          completed: true,
          category: {
            select: { name: true },
          },
        },
        where: { user_id: userId },
      })

      const rows = result.map((r) => ({
        id: r.id,
        title: r.title,
        completed: r.completed,
        due_date: r.due_date,
        priority_level: r.priority_level,
        category_name: r.category.name,
      }))

      return createSuccessOutput(rows)
    } catch (error) {
      console.log(error)

      throw new InternalServerErrorException(error)
    }
  }
}
