import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { singUp } from 'src/modules/User/Dto/singUp.dto';
import { Plan } from 'src/Modules/User/Planes.entity';
import { User } from 'src/Modules/User/User.entity';
import { ErrorHandler } from 'src/Utils/Error.Handler';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersPreLoad implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Plan) private planRepository: Repository<Plan>,
  ) {}

  users: singUp[] = [
    {
      email: 'romer@gmail.com',
      company: 'Assetly',
      password: 'Paria!481632',
      telefono: '+54351532645',
      username: 'Romer',
    },
  ];

  planes: Partial<Plan>[] = [
    {
      id: 1,
      imagen: 'WorkflowImg01',
      name: 'Free Pass',
      alt: 'Workflow 01',
      precio: 'Free',
      activos: '300',
      descripcion:
        'Podrá tener todas las funcionalidades del servicio, a excepción de las personalizaciones.',
    },
    {
      id: 2,
      imagen: 'WorkflowImg02',
      name: 'AssetsOK',
      alt: 'Workflow 02',
      precio: '$80/anual',
      activos: '500',
      descripcion:
        'En este plan podrá tener todas las funcionalidades, además de personalizaciones en Reportes.',
    },
    {
      id: 3,
      imagen: 'WorkflowImg03',
      name: 'UltraAssets',
      alt: 'Workflow 03',
      precio: '$200/anual',
      activos: '2500',
      descripcion:
        'Tendrá todas las funcionalidades, y personalizaciones deseadas.',
      popular: true,
    },
    {
      id: 4,
      imagen: 'WorkflowImg01',
      name: 'MegaAssets',
      alt: 'Workflow 01',
      precio: '$300/anual',
      activos: '10000',
      descripcion: 'Todo lo mencionado.',
    },
    {
      id: 5,
      imagen: 'WorkflowImg02',
      name: 'AssetsGod',
      alt: 'Workflow 02',
      precio: '$600/anual',
      activos: '50000',
      descripcion: 'Todo lo mencionado.',
    },
    {
      id: 6,
      imagen: 'WorkflowImg03',
      name: 'Unlimit',
      alt: 'Workflow 03',
      precio: '$15000/year',
      activos: 'Sin límites',
      descripcion: 'Todo lo mencionado.',
    },
  ];

  async onApplicationBootstrap() {
    await this.preLoadUsers();
    await this.preLoadPlans();
  }

  async preLoadUsers() {
    try {
      for (const userData of this.users) {
        // Verificar si el usuario ya existe por su correo electrónico
        const existingUser = await this.userRepository.findOne({
          where: { email: userData.email },
        });

        if (!existingUser) {
          const hashedPassword = await bcrypt.hash(userData.password, 10);
          const user = this.userRepository.create(userData);
          user.isAdmin = true;
          user.password = hashedPassword;
          await this.userRepository.save(user);
        } else {
          console.log(`El usuario con correo ${userData.email} ya existe`);
        }
      }
      console.log('Usuarios cargados con éxito');
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async preLoadPlans() {
    try {
      for (const planData of this.planes) {
        const existingPlan = await this.planRepository.findOne({
          where: { id: planData.id },
        });

        if (!existingPlan) {
          const plan = this.planRepository.create(planData);
          await this.planRepository.save(plan);
        } else {
          console.log(`El plan con ID ${planData.id} ya existe`);
        }
      }
      console.log('Planes cargados con éxito');
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }
}
