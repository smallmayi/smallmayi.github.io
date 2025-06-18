# 使用Hystrix配置服务熔断和降级以及Hystris Dashboard

## 1.Hystrix简介

Hystrix提供了服务降级，服务熔断，服务限流等服务。

### 雪崩

在微服务架构中通常会有多个服务层调用，基础服务的故障可能会导致级联故障，进而造成整个系统不可用的情况，这种现象被称为服务雪崩效应。服务雪崩效应是一种因“服务提供者”的不可用导致“服务消费者”的不可用,并将不可用逐渐放大的过程。

#### 降级

当请求超时、资源不足等情况发生时进行服务降级处理，不调用真实服务逻辑，而是使用快速失败（fallback）方式直接返回一个托底数据，保证服务链条的完整，避免服务雪崩。

#### 熔断

当Hystrix Command请求后端服务失败数量超过一定比例(默认50%), 断路器会切换到开路状态(Open). 这时所有请求会直接失败而不会发送到后端服务. 断路器保持在开路状态一段时间后(默认5秒), 自动切换到半开路状态(HALF-OPEN). 这时会判断下一次请求的返回情况, 如果请求成功, 断路器切回闭路状态(CLOSED), 否则重新切换到开路状态(OPEN).

熔断器会直接切断请求链, 避免发送大量无效请求影响系统吞吐量, 并且断路器有自我检测并恢复的能力。

*熔断器一般是在服务提供者配置的，而服务降级是在服务消费端使用的。*

## 2.Hystrix

### 创建项目



## 3.Hystrix-dashboard

用于监控信息的面板

### 创建项目

![image-20210702091825434](https://gitee.com/rainscloud/note-images/raw/master/img/20210702105135.png)



 ![image-20210702092203233](https://gitee.com/rainscloud/note-images/raw/master/img/20210702105207.png)

*注意：这里我使用的boot版本是稍低的2.3.12*

新版本的熔断器是推荐使用`Resilience4J`,

dashboard使用2.5版本直接引入的话有异常，所以这里使用了2.3版本

### 使用

启动类添加注解`@EnableHystrixDashboard`

配置端口`8400`

启动成功访问`http://localhost:8400/hystrix`

![image-20210702092810248](https://gitee.com/rainscloud/note-images/raw/master/img/20210702105208.png)

- 第一行输入栏就是我们要监控的微服务的地址

- Delay 参数用来控制服务器上轮询监控信息的延迟时间，默认是2000毫秒，可以通过配置该属性来降低客户端的网络和cpu消耗。

- Title 就是监控信息的标题，这个我们一般填写微服务名

### 消费者配置监控信息

在之前的调用服务添加依赖

```yaml
        <!--actuator监控信息-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
```

### 消费者配置HystrixMetricsStreamServlet

需要手动配置一个servlet

```java
package com.example.hystrix;

import com.netflix.hystrix.contrib.metrics.eventstream.HystrixMetricsStreamServlet;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RestConfig {

    @Bean
    public ServletRegistrationBean getServlet() {
        HystrixMetricsStreamServlet streamServlet = new HystrixMetricsStreamServlet();
        ServletRegistrationBean registrationBean = new ServletRegistrationBean(streamServlet);
        registrationBean.setLoadOnStartup(1);
        registrationBean.addUrlMappings("/actuator/hystrix.stream");
        registrationBean.setName("HystrixMetricsStreamServlet");
        return registrationBean;
    }

}

```

### Dashboard配置

```yaml
#port
server:
  port: 8400
#dashboard
hystrix:
  dashboard:
    proxy-stream-allow-list: "*"
```

### 调用服务查看dashboard

![image-20210702095721113](https://gitee.com/rainscloud/note-images/raw/master/img/20210702105209.png)

![image-20210702095255196](https://gitee.com/rainscloud/note-images/raw/master/img/20210702105210.png)

dashboard 填写路径：`http://localhost:8303/actuator/hystrix.stream`

调用服务查看监控情况