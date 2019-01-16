## Linux Build Notes 

### 1. Clone the repository

    git clone https://github.com/HERCone/herc-edge-login.git
    cd herc-edge-login

### 2. Install the dependencies

  #### 2.1. Node: (at least Version 8.9.1)
  ##### Using Ubuntu
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    sudo apt-get install -y nodejs

  ##### Using Debian, as root
    curl -sL https://deb.nodesource.com/setup_8.x | bash -
    apt-get install -y nodejs


  #### 2.2. yarn (at least version 1.2.3)
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt-get update && sudo apt-get install yarn


  #### 2.3. JDK (at least version 8.0)
    Follow instructions on
    https://docs.oracle.com/javase/8/docs/technotes/guides/install/linux_jdk.html

  #### 2.4. Android Studio
    Follow the instructions on:
    https://developer.android.com/studio/

    OR
    
    Use the Ubuntu Software to install Android Studio.

  #### 2.5. Android NDK
    Follow the instructions on:
    https://developer.android.com/ndk/guides/

  #### 3.6. Ninja 
    apt-get install ninja-build

  #### 3.7. React native cli
    npm install -g react-native-cli

  #### 3.8. Genymotion 
    Download and install Genymotion by following instructions on:
    https://www.genymotion.com/fun-zone/

### 3. Build and run the application
  
    react-native run android

