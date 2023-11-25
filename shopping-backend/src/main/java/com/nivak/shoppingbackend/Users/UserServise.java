package com.nivak.shoppingbackend.Users;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nivak.shoppingbackend.Email.EmailService;

@Service
public class UserServise {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private void MyUser(@Qualifier("user") UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User registeruser(User user){
        User newUser = new User();
        newUser.setEmail(user.getEmail());

        User savedEmail = userRepository.save(newUser);

        emailService.sendVerificationEmail(savedEmail);        

        return savedEmail;
    }
    
    public User storeProfilePic(String email, MultipartFile profilepic) throws IOException {
        User user = userRepository.findByEmail(email);
    
        String[] emailParts = email.split("@");
        String desiredName = emailParts[0];
        String UPLOAD_DIR = new ClassPathResource("static/Images/ImageUser").getFile().getAbsolutePath();
        String directoryPath = UPLOAD_DIR +"/";
        String filePath = directoryPath+desiredName + ".png";
        String pathstored = "/Images/ImageUser/"+desiredName + ".png";
        System.out.println(pathstored);
        user.setProfilepic(pathstored);
    
        try {
            File directory = new File(directoryPath);
            if (!directory.exists()) {
                if (directory.mkdirs()) {

                    File file = new File(filePath);
                    profilepic.transferTo(file);
    
                    if (file.exists()) {
                        return userRepository.save(user);
                    }
                }
            } else {
                File file = new File(filePath);
                profilepic.transferTo(file);
    
                if (file.exists()) {
                    return userRepository.save(user);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    
        return null; // Handle the case where the file isn't saved
    }
    
    
}
