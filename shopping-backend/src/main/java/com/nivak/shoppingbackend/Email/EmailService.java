package com.nivak.shoppingbackend.Email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.nivak.shoppingbackend.Users.User;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendVerificationEmail(User user){
        MimeMessage message = javaMailSender.createMimeMessage();
        String token = user.getVerificationToken();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message,true);
            helper.setTo(user.getEmail());
            helper.setSubject("Verify Your Email to Continue");
            String emailContent = "Dear User,<br>"
                + "Thank you for registering in Nivak's. To be a member of Nivak, Please click the button below to verify your email:<br><br>"
                + "<a href='http://localhost:8080/nivak/cars/verify?token=" + token + "' style='"
                + "display: inline-block; padding: 10px 20px; font-size: 16px; "
                + "color: white; text-decoration: none; background-color: limegreen;'>"
                + "Verify Email</a><br><br>"
                + "Best regards,<br>Your Nivak's";

            helper.setText(emailContent,true);
            javaMailSender.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
