---
layout: post
title: 2장 실습 Amazon EKS 네트워킹
subtitle: Amazon EKS의 네트워크 구조를 알아보고 통신 흐름을 살펴봅니다.
gh-repo: daattali/beautiful-jekyll
gh-badge: [star, fork, follow]
tags: [test]
comments: true
---

This is a demo post to show you how to write blog posts with markdown.  I strongly encourage you to [take 5 minutes to learn how to write in markdown](https://markdowntutorial.com/) - it'll teach you how to transform regular text into bold/italics/headings/tables/etc.








**Here is some bold text**
<br/><br/><br/><br/><br/><br/>
## Amazon EKS 배포

Here's a useless table:

| Number | Next number | Previous number |
| :------ |:--- | :--- |
| Five | Six | Four |
| Ten | Eleven | Nine |
| Seven | Eight | Six |
| Two | Three | One |

__eks 클러스터 & 관리형노드그룹 배포 전 정보 확인해__

How about a yummy crepe?

![Crepe](https://s3-media3.fl.yelpcdn.com/bphoto/cQ1Yoa75m2yUFFbY2xwuqw/348s.jpg)

It can also be centered!

![Crepe](https://s3-media3.fl.yelpcdn.com/bphoto/cQ1Yoa75m2yUFFbY2xwuqw/348s.jpg){: .mx-auto.d-block :}

## 기본 정보 확인

* 사용자 확인
~~~
var foo = function(x) {
  return(x + 5);
}
foo(3)
~~~


<span style="background-color:#99ffff"> kubectl 설치 확인 </span>

```javascript
aws ec2 describe-vpcs --filters "Name=tag:Name,Values=$CLUSTER_NAME-VPC" | jq
```

And here is the same code yet again but with line numbers:

{% highlight javascript linenos %}
export PubSubnet1=$(aws ec2 describe-subnets --filters Name=tag:Name,Values="$CLUSTER_NAME-PublicSubnet1" \
--query "Subnets[0].[SubnetId]" --output text)
{% endhighlight %}

***

## Kubernetes
You can add notification, warning and error boxes like this:

---

### Notification

{: .box-note}
**Note:** This is a notification box.

### Warning

{: .box-warning}
**Warning:** This is a warning box.

### Error

{: .box-error}
**Error:** This is an error box.