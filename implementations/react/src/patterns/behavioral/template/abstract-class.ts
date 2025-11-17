/**
 * Clase Abstracta que define el esqueleto del algoritmo para manejar formularios.
 */

export abstract class FormTemplate {
  async submit(formData: Record<string, any>) {
    const cleanData = this.validate(formData);

    const result = await this.send(cleanData);

    await this.afterSuccess(result);

    return this.successMessage(result);
  }

  protected abstract validate(data: Record<string, any>): Record<string, any>;
  protected abstract send(cleanData: Record<string, any>): Promise<any>;
  protected abstract afterSuccess(result: any): Promise<void>;
  protected abstract successMessage(result: any): string;
}
