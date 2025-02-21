import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir mensagem de erro com credenciais inválidas', () => {
    component.loginForm.controls['username'].setValue('invalidUser');
    component.loginForm.controls['password'].setValue('invalidPass');
    component.login();
    expect(component.errorMessage).toBe('Usuário ou senha inválidos');
  });

  it('deve realizar login com credenciais válidas', () => {
    component.loginForm.controls['username'].setValue('admin');
    component.loginForm.controls['password'].setValue('password');
    spyOn(window, 'alert');
    component.login();
    expect(window.alert).toHaveBeenCalledWith('Login bem-sucedido');
  });

  it('deve desabilitar o botão "Entrar" se o formulário for inválido', () => {
    const submitButton: DebugElement = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submitButton.nativeElement.disabled).toBeTrue();
  });

  it('deve habilitar o botão "Entrar" se o formulário for válido', () => {
    component.loginForm.controls['username'].setValue('admin');
    component.loginForm.controls['password'].setValue('password');
    fixture.detectChanges();
    const submitButton: DebugElement = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submitButton.nativeElement.disabled).toBeFalse();
  });
});
