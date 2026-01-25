import { describe, it, expect } from 'vitest';
import { ILabelFactory, InvalidLabelNameError } from '@org/todo-domain-protocol';
import { DefaultLabelFactory } from '../factories/default-label.factory';

describe('DefaultLabel Entity', () => {
  const factory: ILabelFactory = new DefaultLabelFactory();

  describe('Factory: create', () => {
    it('should create a valid Label (Happy Path)', () => {
      const name = 'Urgent';
      const color = '#FF0000';
      const label = factory.create(name, color);

      expect(label.id).toBeDefined();
      expect(label.name).toBe(name);
      expect(label.color).toBe(color);
    });

    it('should throw InvalidLabelNameError when name is empty', () => {
      expect(() => factory.create('', '#000000'))
        .toThrow(InvalidLabelNameError);
    });
  });

  describe('Methods', () => {
    it('should update name', () => {
      const label = factory.create('Old Name', '#000');
      label.updateName('New Name');
      expect(label.name).toBe('New Name');
    });

    it('should throw InvalidLabelNameError when updating with empty name', () => {
      const label = factory.create('Valid', '#000');
      expect(() => label.updateName('')).toThrow(InvalidLabelNameError);
    });

    it('should update color', () => {
      const label = factory.create('Name', '#000');
      label.updateColor('#FFF');
      expect(label.color).toBe('#FFF');
    });
  });
});
