// app/category2/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import Header2 from "@/components/Header2";
import Footer2 from "@/components/Footer2";
import { allCourses2, categories2 } from "@/data/Category2_data";
import styles from "@/styles/p-css/Category2.module.css";

// ✅ 개별 강의 카드 컴포넌트
const CourseCard = ({ course, tags = [] }) => (
  <div className={styles["course2-card"]}>
    <Image
      src={course.img}
      alt={course.title}
      width={400}
      height={230}
      className={styles["course2-img"]}
    />
    <div className={styles["course2-content"]}>
      <div className={styles["course2-tags"]}>
        {tags.map((tag, i) => (
          <span key={i} className={`${styles["course2-tag"]} font-thin`}>
            {tag}
          </span>
        ))}
      </div>
      <p className={styles["course2-title"]}>{course.title}</p>
    </div>
    <button className={styles["course2-btn"]}>수강신청</button>
  </div>
);

// ✅ 태그 랜덤 생성
function getRandomTags(tagPool, count = 2) {
  const shuffled = [...tagPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// ✅ 메인 페이지
export default function Category2Page() {
  const [activeCategory, setActiveCategory] = useState(categories2[0]);
  const [query, setQuery] = useState("");
  const [courseTags, setCourseTags] = useState({});
  const [forceNoResult, setForceNoResult] = useState(false);

  const tagPools = {
    popular: ["퍼피 교육", "인기", "추천"],
    basic: ["기본 훈련", "보호자 필수", "기초"],
    senior: ["노견 케어", "건강", "힐링"],
    health: ["건강", "영양", "면역력"],
    adult: ["성견 교육", "집중 훈련", "교감"],
    puppy: ["퍼피 교육", "기초", "훈련시작"],
    behavior: ["문제행동", "행동 교정", "집중"],
    search: ["검색결과", "추천", "베스트"],
  };

  useEffect(() => {
    const saved =
      typeof window !== "undefined" && localStorage.getItem("courseTags2");
    if (saved) {
      setCourseTags(JSON.parse(saved));
    } else {
      const tagMap = {};
      Object.entries(allCourses2).forEach(([key, courses]) => {
        tagMap[key] = courses.map(() => getRandomTags(tagPools[key], 2));
      });
      localStorage.setItem("courseTags2", JSON.stringify(tagMap));
      setCourseTags(tagMap);
    }
  }, []);

  const allCourseArray = Object.values(allCourses2).flat();
  const filteredCourses = allCourseArray.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase())
  );
  const showSearchResults = query.trim().length > 0;

  const sectionTitles = {
    popular: "인기 교육 과정",
    basic: "기본 훈련",
    senior: "발달 단계별 교육 > 노견 케어",
    health: "건강&케어",
    adult: "발달 단계별 교육 > 성견 교육",
    puppy: "발달 단계별 교육 > 퍼피 교육",
    behavior: "문제행동 교정",
  };

  return (
    <div className={styles["category2-allbox"]}>
      <Header2 />

      <div className={styles["category2-wrapper"]}>
        <div className={styles["category2-inner1300"]}>
          {/* ✅ 태블릿/모바일용 제목 + 버튼 묶음 */}
          <div className={styles["category2-header-T"]}>
            <h2 className={styles["category2-title"]}>자격증 교육</h2>
            <div className={styles["category2-buttons-T"]}>
              {categories2.map((cat) => (
                <button
                  key={cat.id}
                  className={`${styles["category2-btn"]} ${activeCategory.id === cat.id ? styles["active"] : ""
                    }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* ✅ PC용 타이틀 */}
          <h2 className={styles["category2-title"]}>자격증 교육</h2>

          {/* ✅ 상단 (이미지 + 설명 + 버튼) */}
          <div className={styles["category2-top"]}>
            {/* 왼쪽 이미지 */}
            <div className={styles["category2-left"]}>
              <Image
                src={activeCategory.img}
                alt={activeCategory.name}
                width={600}
                height={400}
                className={styles["category2-main-img"]}
              />
            </div>

            {/* 오른쪽 내용 */}
            <div className={styles["category2-right"]}>
              {/* ✅ PC용 버튼 */}
              <div className={styles["category2-buttons"]}>
                {categories2.map((cat) => (
                  <button
                    key={cat.id}
                    className={`${styles["category2-btn"]} ${activeCategory.id === cat.id ? styles["active"] : ""
                      }`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* 설명 */}
              <div className={styles["category2-desc"]}>
                <Image
                  src="/img/category2-left.png"
                  alt="왼쪽 따옴표"
                  width={45}
                  height={45}
                  className={`${styles["quote2-mark-img"]} ${styles["left"]}`}
                />
                <p
                  className="leading2-relaxed"
                  dangerouslySetInnerHTML={{ __html: activeCategory.content }}
                />
                <Image
                  src="/img/category2-right.png"
                  alt="오른쪽 따옴표"
                  width={45}
                  height={45}
                  className={`${styles["quote2-mark-img"]} ${styles["right"]}`}
                />
              </div>

              {/* 학습 버튼 */}
              <button className={styles["category2-learn-btn"]}>
                {activeCategory.btnText}
                <Image src="/img/category2-arrow.png" alt="arrow" width={20} height={20} />
              </button>
            </div>
          </div>

          {/* ✅ 검색창 */}
          <div className={styles["category2-search"]}>
            <input
              type="text"
              placeholder="가온 회원만을 위한 자격증 교육 과정을 검색해보세요."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setForceNoResult(false);
              }}
            />
            <FiSearch
              className={styles["search2-icon"]}
              onClick={() => {
                if (query.trim() === "") setForceNoResult(true);
                else setForceNoResult(false);
              }}
            />
          </div>

          {/* ✅ 검색 결과 */}
          {(showSearchResults || forceNoResult) && (
            <div className={styles["search2-results"]}>
              <div className={styles["section2-header"]}>
                <h3>검색 결과</h3>
              </div>

              {filteredCourses.length > 0 && !forceNoResult ? (
                <div className={styles["category2-cards"]}>
                  {filteredCourses.slice(0, 4).map((course) => {
                    const categoryKey = Object.keys(allCourses2).find((key) =>
                      allCourses2[key].some((c) => c.id === course.id)
                    );
                    const courseIndex = allCourses2[categoryKey].findIndex(
                      (c) => c.id === course.id
                    );
                    const tags = courseTags[categoryKey]?.[courseIndex] || [];
                    return <CourseCard key={course.id} course={course} tags={tags} />;
                  })}
                </div>
              ) : (
                <p className={styles["no2-results"]}>해당하는 강의가 없습니다.</p>
              )}

            </div>
          )}

          {/* ✅ 카테고리 섹션별 */}
          {Object.entries(allCourses2).map(([key, courseList], i) => {
            if (key === "search") return null;

            return (
              <React.Fragment key={key}>
                <div className={styles["category2-section"]}>
                  <div className={styles["section2-header"]}>
                    <h3>{sectionTitles[key]}</h3>
                  </div>
                  <div className={styles["category2-cards"]}>
                    {courseList.map((course, idx) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        tags={courseTags[key]?.[idx] || []}
                      />
                    ))}
                  </div>
                </div>

                {/* ✅ 섹션 중간에 배너 삽입 */}
                {i === 1 && (
                  <div className={styles["category2-banner1"]}>
                    <Image
                      src="/img/category2-banner1.png"
                      alt="자격증 교육 배너 1"
                      width={1300}
                      height={400}
                      className={styles["category2-banner-img"]}
                    />
                  </div>
                )}
                {i === 3 && (
                  <div className={styles["category2-banner1"]}>
                    <Image
                      src="/img/category2-banner2.png"
                      alt="자격증 교육 배너 2"
                      width={1300}
                      height={400}
                      className={styles["category2-banner-img"]}
                    />
                  </div>
                )}
                {i === 5 && (
                  <div className={styles["category2-banner1"]}>
                    <Image
                      src="/img/category2-banner3.png"
                      alt="보호자 교육 배너 3"
                      width={1300}
                      height={400}
                      className={styles["category2-banner-img"]}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <Footer2 />
    </div>
  );
}
