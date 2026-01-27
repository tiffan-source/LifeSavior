import { Controller, Get, Put, Param, Body, UseFilters } from '@nestjs/common';
import {
  IGetAllLabelsUseCase,
  IEditLabelUseCase,
  TODO_TOKENS,
} from '@org/todo-business-protocol';
import { Inject } from '@nestjs/common';
import { EditLabelDto, LabelResponseDto } from '../dtos/label.dto';
import { LabelPresenter } from '../presenters/label.presenter';
import { BusinessErrorFilter } from '../filters/business-error.filter';

/**
 * Controller pour les endpoints LABEL.
 * Utilise le pattern Presenter pour la transformation et la gestion d'erreur.
 */
@Controller('labels')
@UseFilters(BusinessErrorFilter)
export class LabelController {
  private readonly presenter = new LabelPresenter();

  constructor(
    @Inject(TODO_TOKENS.GET_ALL_LABELS_USECASE)
    private readonly getAllLabelsUseCase: IGetAllLabelsUseCase,
    @Inject(TODO_TOKENS.EDIT_LABEL_USECASE)
    private readonly editLabelUseCase: IEditLabelUseCase
  ) {}

  @Get()
  async getAll(): Promise<LabelResponseDto[]> {
    try {
      const labels = await this.getAllLabelsUseCase.execute();
      return this.presenter.presentList(labels);
    } catch (error) {
      this.presenter.handleError(error as Error);
    }
  }

  @Put(':id')
  async edit(
    @Param('id') id: string,
    @Body() dto: EditLabelDto
  ): Promise<LabelResponseDto> {
    try {
      const label = await this.editLabelUseCase.execute({
        labelId: id,
        ...dto,
      });
      return this.presenter.present(label);
    } catch (error) {
      this.presenter.handleError(error as Error);
    }
  }
}
