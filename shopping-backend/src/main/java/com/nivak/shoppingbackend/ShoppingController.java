package com.nivak.shoppingbackend;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.nivak.shoppingbackend.Cars.Car;
import com.nivak.shoppingbackend.Cars.CarRepository;
import com.nivak.shoppingbackend.Cars.CarService;
import com.nivak.shoppingbackend.Email.EmailService;
import com.nivak.shoppingbackend.Users.User;
import com.nivak.shoppingbackend.Users.UserRepository;
import com.nivak.shoppingbackend.Users.UserServise;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Controller
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/nivak/cars")
public class ShoppingController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserServise userServise;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private CarService carService;

    @Autowired
    private EmailService emailService;


    @GetMapping("/")
    public String home() {
        return "Home";
    }

    @GetMapping("/login")
    public String login(){
        return "Login";
    }

    @GetMapping("/register")
    public String register(){
        return "Register";
    }

    @PostMapping("/registered")
    public String Registered(@RequestParam("firstname") String firstname,
                           @RequestParam("lastname") String lastname,
                           @RequestParam("age") int age,
                           @RequestParam("gender") String gender,
                           @RequestParam("email") String email,
                           @RequestParam("password") String password){
        User users = userRepository.findByEmail(email);
        if (users !=null){
            return "redirect:/nivak/cars/register?eae";
        }
        else{
            User newUser = new User();
            String token = generateToken();
            newUser.setVerificationToken(token);
            newUser.setFirstname(firstname);
            newUser.setLastname(lastname);
            newUser.setAge(age);
            newUser.setGender(gender);
            newUser.setEmail(email);
            newUser.setPassword(password);

            CompletableFuture.supplyAsync(() ->{
                User savedUser = userRepository.save(newUser);
                emailService.sendVerificationEmail(savedUser);
                return savedUser;
            });

            return "redirect:/nivak/cars/login?reg";
        }

    }

    private String generateToken(){
        return UUID.randomUUID().toString();
    }

    @GetMapping("/verify")
    public String VerfiyEmail(@RequestParam("token") String token){
        User user = userRepository.findByVerificationToken(token);
        System.out.println(user);
        if (user != null) {
            if (!user.isVerified()) {
                user.setVerified(true);
                userRepository.save(user);
                return "redirect:/nivak/cars/login?reged";
            } else {
                return "redirect:/nivak/cars/login?eav";
            }
        } else {
            return "redirect:/nivak/cars/login?enf";
        }
    }

    @PostMapping("/logined")
    public String Logined(@RequestParam("logemail") String email,
                        @RequestParam("logpassword") String password, HttpServletResponse response){
        
        User user = userRepository.findByEmail(email);

        if (user != null) {
            if (user.isVerified()) {
                if (user.getPassword().equals(password)) {
                    Cookie cookie = new Cookie("userId",email);
                    cookie.setPath("/");
                    response.addCookie(cookie);
                    return "redirect:http://localhost:3000/";
                } else {
                    return "redirect:/nivak/cars/login?pic";
                }
            }
            else{
                return "redirect:/nivak/cars/login?env";
            }
        } else {
            return "redirect:/nivak/cars/login?unf";
        }

    }

    @GetMapping("/user/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email){
        return new ResponseEntity<User>(userRepository.findByEmail(email),HttpStatus.OK);
    }

    @PostMapping("/uploadprofilepic")
    public ResponseEntity<String> uploadProfilePic(@RequestParam("email") String email, @RequestParam("file") MultipartFile file) {
        try {
            userServise.storeProfilePic(email,file);
            return ResponseEntity.ok("Image uploaded");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading media"+e);
        }
    }

    public String removeSpacesAndJoinWords(String text) {
        String result = text.replaceAll("\\s", "");
        return result;
    }

    @PostMapping("/uploadcars")
    public ResponseEntity<String> uploadCars(@RequestParam("carid") String carid,
                                            @RequestParam("carcompany") String carcompany,
                                            @RequestParam("carname") String carname,
                                            @RequestParam("type") String type,
                                            @RequestParam("price") double price,
                                            @RequestParam("pricetag") String pricetag,
                                            @RequestParam("specs") List<String> specs,
                                            @RequestParam("description") String description,
                                            @RequestPart("images") List<MultipartFile> imagefile) throws IOException{
        try {
            Car car = new Car();
            car.setCarid(carid);
            car.setCarcompany(carcompany);
            car.setCarname(carname);
            car.setType(type);
            car.setPrice(price);
            car.setPricetag(pricetag);
            car.setSpecs(specs);
            car.setDescription(description);

            List<String> images = new ArrayList<>();

            int index = 1;

            for (MultipartFile imageFile : imagefile) {
                String carmodedname = removeSpacesAndJoinWords(carname);
                String desiredName = carmodedname+"_"+index;
                String UPLOAD_DIR = new ClassPathResource("static/Images/CarImages").getFile().getAbsolutePath();
                String directoryPath = UPLOAD_DIR + "/"+carcompany+"/"+carmodedname+"/";

                String filePath = directoryPath+desiredName+ ".png";
                String pathstored = "/Images/CarImages/"+carcompany+"/"+carmodedname+"/"+desiredName+ ".png";
                System.out.println(pathstored);
                images.add(pathstored);
                try {
                    File directory = new File(directoryPath);
                    if (!directory.exists()) {
                        if (directory.mkdirs()) {

                            File file = new File(filePath);
                            imageFile.transferTo(file);
                            if (file.exists()) {
                                
                            }
                        }
                    } else {
                        File file = new File(filePath);
                        imageFile.transferTo(file);
        
                        if (file.exists()) {
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }

                index++;
            }

            car.setImages(images);
            
            carRepository.save(car);

            return ResponseEntity.ok("data saved");

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Data not saved");
        }
    }

    @GetMapping("/allcar")
    public ResponseEntity<List<Car>> showAllCar(){
        return new ResponseEntity<>(carService.showCars(), HttpStatus.OK);
    }

    @GetMapping("/carbyid/{carid}")
    public ResponseEntity<Optional<Car>> showCarById(@PathVariable String carid){
        return new ResponseEntity<Optional<Car>>(carService.showcarById(carid),HttpStatus.OK);
    }

}

