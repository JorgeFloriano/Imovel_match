<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Auth\Notifications\ResetPassword as ResetPasswordNotification;
use Illuminate\Notifications\Messages\MailMessage;

class CustomResetPasswordNotification extends ResetPasswordNotification
{
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Redefinição de Senha - ' . config('app.name'))
            ->greeting('Olá, ' . $notifiable->name)
            ->line('Você está recebendo este e-mail porque uma solicitação de redefinição de senha foi feita para sua conta.')
            ->action('Redefinir Senha', $this->resetUrl($notifiable))
            ->line('Este link expirará em 60 minutos.')
            ->line('Se você não solicitou esta redefinição, ignore este e-mail.')
            ->salutation('Atenciosamente, ' . config('app.name'));
    }
}
