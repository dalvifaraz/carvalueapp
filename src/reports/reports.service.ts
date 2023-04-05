import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  createReport(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    console.log('Report Created');
    return this.repo.save(report);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.findOne(parseInt(id));
    if (!report) {
      throw new NotFoundException('Report Not Found');
    }
    report.approved = approved;
    return this.repo.save(report);
  }

  async getEstimate({ make, model, year, mileage, lat, lng }: GetEstimateDto) {
    let price = await this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('(LOWER(make)) = :make', { make })
      .andWhere('(LOWER(model) = :model)', { model })
      .andWhere('lng = :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -5 AND 5', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
    if (price.price) {
      return price;
    }
    price = {
      price: Math.floor(Math.random() * 29000) + 24000,
    };
    return price;
  }
}
