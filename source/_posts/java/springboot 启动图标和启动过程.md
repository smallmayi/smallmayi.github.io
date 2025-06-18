# Springboot 启动图标和启动过程

## 启动图标

### 默认图标

![image-20210812104530441](https://gitee.com/rainscloud/note-images/raw/master/img/20210812104530.png)

### 自定义图标

1. 先在网站生成想要的图标（http://www.network-science.de/ascii/ ， http://patorjk.com/software/taag）

2. 创建`banner.txt`文件填充图标内容，放到`resources`目录下

   ![image-20210812105529675](https://gitee.com/rainscloud/note-images/raw/master/img/20210812105529.png)

3. 再次启动

![image-20210812105447484](https://gitee.com/rainscloud/note-images/raw/master/img/20210812105447.png)

图标设置成功

## 启动过程

默认的启动类,只有`@SpringBootApplication`注解和`run`方法，一步一步进入方法看到新建了一个`SpringApplication`对象并调用对象的`run`方法

```java
@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

}
```

```java
    public static ConfigurableApplicationContext run(Class<?> primarySource, String... args) {
        return run(new Class[]{primarySource}, args);
    }

    public static ConfigurableApplicationContext run(Class<?>[] primarySources, String[] args) {
        return (new SpringApplication(primarySources)).run(args);
    }
```

我们看下这两个步骤干了什么？

### 1.新建SpringApplication对象

```java
public SpringApplication(Class<?>... primarySources) {
    this((ResourceLoader)null, primarySources);
}

public SpringApplication(ResourceLoader resourceLoader, Class<?>... primarySources) {
    this.sources = new LinkedHashSet();
    this.bannerMode = Mode.CONSOLE;
    this.logStartupInfo = true;
    this.addCommandLineProperties = true;
    this.addConversionService = true;
    this.headless = true;
    this.registerShutdownHook = true;
    this.additionalProfiles = Collections.emptySet();
    this.isCustomEnvironment = false;
    this.lazyInitialization = false;
    this.applicationContextFactory = ApplicationContextFactory.DEFAULT;
    this.applicationStartup = ApplicationStartup.DEFAULT;
    //资源加载对象
    this.resourceLoader = resourceLoader;
    Assert.notNull(primarySources, "PrimarySources must not be null");
    this.primarySources = new LinkedHashSet(Arrays.asList(primarySources));
    this.webApplicationType = WebApplicationType.deduceFromClasspath();
    this.bootstrapRegistryInitializers = this.getBootstrapRegistryInitializersFromSpringFactories();
    //初始化
    this.setInitializers(this.getSpringFactoriesInstances(ApplicationContextInitializer.class));
    //监听器
    this.setListeners(this.getSpringFactoriesInstances(ApplicationListener.class));
    this.mainApplicationClass = this.deduceMainApplicationClass();
}
```

重要的2个方法就是`setInitializers`和`setListeners`,我们来分别看下这两个方法的内容和作用

1. `setInitializers`

   ```java
   public void setInitializers(Collection<? extends ApplicationContextInitializer<?>> initializers) {
       this.initializers = new ArrayList(initializers);
   }
   ```

   ```java
   @FunctionalInterface
   public interface ApplicationContextInitializer<C extends ConfigurableApplicationContext> {
       void initialize(C var1);
   }
   ```

    这个方法里面放了一个`ApplicationContextInitializer<?>`集合，

   泛型是`ConfigurableApplicationContext`。

   <br>

   我们回头看下调用时`getSpringFactoriesInstances`方法

   ```java
   private <T> Collection<T> getSpringFactoriesInstances(Class<T> type) {
       return this.getSpringFactoriesInstances(type, new Class[0]);
   }
   
   private <T> Collection<T> getSpringFactoriesInstances(Class<T> type, Class<?>[] parameterTypes, Object... args) {
       ClassLoader classLoader = this.getClassLoader();
       Set<String> names = new LinkedHashSet(SpringFactoriesLoader.loadFactoryNames(type, classLoader));
       List<T> instances = this.createSpringFactoriesInstances(type, parameterTypes, classLoader, args, names);
       AnnotationAwareOrderComparator.sort(instances);
       return instances;
   }
   
       private <T> List<T> createSpringFactoriesInstances(Class<T> type, Class<?>[] parameterTypes, ClassLoader classLoader, Object[] args, Set<String> names) {
         xxx
           }
   ```

   这里主要就是`SpringFactoriesLoader`类的`loadFactoryNames`和自身的`createSpringFactoriesInstances`创建实例这两个方法。

   

   

2. `setListeners`















我们先看一下`run`方法，返回的是`SpringApplication`对象的静态run方法，继续看这个静态的`run`方法

```java
public ConfigurableApplicationContext run(String... args) {
    StopWatch stopWatch = new StopWatch();
    stopWatch.start();
    DefaultBootstrapContext bootstrapContext = this.createBootstrapContext();
    ConfigurableApplicationContext context = null;
    this.configureHeadlessProperty();
    SpringApplicationRunListeners listeners = this.getRunListeners(args);
    listeners.starting(bootstrapContext, this.mainApplicationClass);

    try {
        ApplicationArguments applicationArguments = new DefaultApplicationArguments(args);
        ConfigurableEnvironment environment = this.prepareEnvironment(listeners, bootstrapContext, applicationArguments);
        this.configureIgnoreBeanInfo(environment);
        Banner printedBanner = this.printBanner(environment);
        context = this.createApplicationContext();
        context.setApplicationStartup(this.applicationStartup);
        this.prepareContext(bootstrapContext, context, environment, listeners, applicationArguments, printedBanner);
        this.refreshContext(context);
        this.afterRefresh(context, applicationArguments);
        stopWatch.stop();
        if (this.logStartupInfo) {
            (new StartupInfoLogger(this.mainApplicationClass)).logStarted(this.getApplicationLog(), stopWatch);
        }

        listeners.started(context);
        this.callRunners(context, applicationArguments);
    } catch (Throwable var10) {
        this.handleRunFailure(context, var10, listeners);
        throw new IllegalStateException(var10);
    }

    try {
        listeners.running(context);
        return context;
    } catch (Throwable var9) {
        this.handleRunFailure(context, var9, (SpringApplicationRunListeners)null);
        throw new IllegalStateException(var9);
    }
}
```