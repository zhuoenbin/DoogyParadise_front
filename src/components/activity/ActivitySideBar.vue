<template>
  <div>
    <sidebar-menu :menu="menu" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu: [
        {
          header: "Main Service",
          hiddenOnCollapse: true,
        },
        {
          href: "/activity",
          title: "寵活動",
          icon: "fa-solid fa-seedling",
          child: [
            {
              href: "/activity/create",
              title: "舉辦活動",
            },
            {
              href: "/charts/sublink",
              title: "ppp",
            },
            {
              href: "/charts/sublink",
              title: "000",
            },
          ],
        },
        {
          href: "/charts",
          title: "場地租借",
          icon: "fa fa-chart-area",
          child: [
            {
              href: "/charts/sublink",
              title: "場地介紹",
            },
            {
              href: "/charts/sublink",
              title: "租借場地",
            },
            {
              href: "/charts/sublink",
              title: "我的租借",
            },
          ],
        },
        {
          href: "/",
          title: "我的活動",
          icon: "fa fa-user",
          child: [
            {
              href: "/charts/sublink",
              title: "報名中",
            },
            {
              href: "/charts/sublink",
              title: "過去參加",
            },
            {
              href: "/charts/sublink",
              title: "我的收藏",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style></style>
