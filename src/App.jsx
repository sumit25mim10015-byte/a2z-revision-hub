import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

// ════════════════════════════════════════════════════════════════════════════
// TOPIC DATA
// ════════════════════════════════════════════════════════════════════════════

const TOPIC_SORTING = {
    stepId: "step2", stepTitle: "Step 2: Sorting Techniques", color: "#06B6D4",
    subtopics: [
      { id: "2.1", title: "Sorting I", problems: [
        { id:31, name:"Selection Sort",                          difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3ppA6YJ", yt:"https://youtu.be/HGk_ypEuS24?t=166" },
        { id:32, name:"Bubble Sort",                             difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3w6yQx8", yt:"https://youtu.be/HGk_ypEuS24?t=1061" },
        { id:33, name:"Insertion Sort",                          difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3JVcqot", yt:"https://youtu.be/HGk_ypEuS24?t=1901" },
      ]},
      { id: "2.2", title: "Sorting II", problems: [
        { id:34, name:"Merge Sort",                              difficulty:"Medium", lc:null, gfg:"https://bit.ly/3A30Anw", yt:"https://youtu.be/ogjf7ORKfd8" },
        { id:35, name:"Recursive Bubble Sort",                   difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3QV65vI", yt:null },
        { id:36, name:"Recursive Insertion Sort",                difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3PxAWx1", yt:null },
        { id:37, name:"Quick Sort",                              difficulty:"Medium", lc:null, gfg:"https://bit.ly/3dsEbIK", yt:"https://youtu.be/WIrA4YexLRQ" },
      ]},
    ]
};

const TOPIC_ARRAYS = {
    stepId: "step3", stepTitle: "Step 3: Arrays", color: "#10B981",
    subtopics: [
      { id: "3.1", title: "Arrays — Easy", problems: [
        { id:38, name:"Largest Element in an Array",             difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3Pld280", yt:"https://youtu.be/37E9ckMDdTk?t=527" },
        { id:39, name:"Second Largest Element in an Array",      difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3pFvBcN", yt:"https://youtu.be/37E9ckMDdTk?t=811" },
        { id:40, name:"Check if Array is Sorted",                difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3Ap9U6F", yt:"https://youtu.be/37E9ckMDdTk?t=1723" },
        { id:41, name:"Remove Duplicates from Sorted Array",     difficulty:"Easy",   lc:"https://leetcode.com/problems/remove-duplicates-from-sorted-array/", gfg:"https://bit.ly/3w7b6ck", yt:"https://youtu.be/37E9ckMDdTk?t=1886" },
        { id:42, name:"Left Rotate an Array by One Place",       difficulty:"Easy",   lc:"https://leetcode.com/problems/rotate-array/", gfg:"https://bit.ly/3dnn9vC", yt:"https://youtu.be/wvcQg43_V8U?t=61" },
        { id:43, name:"Left Rotate an Array by D Places",        difficulty:"Easy",   lc:"https://leetcode.com/problems/rotate-array/", gfg:"https://bit.ly/3dyCKZg", yt:"https://youtu.be/wvcQg43_V8U?t=485" },
        { id:44, name:"Move Zeros to End",                       difficulty:"Easy",   lc:"https://leetcode.com/problems/move-zeroes/", gfg:"https://bit.ly/3PrGIjT", yt:"https://youtu.be/wvcQg43_V8U?t=1633" },
        { id:45, name:"Linear Search",                           difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3KcpHcB", yt:"https://youtu.be/wvcQg43_V8U?t=2465" },
        { id:46, name:"Union and Intersection of Two Sorted Arrays", difficulty:"Easy", lc:null, gfg:"https://bit.ly/3Ap7Onp", yt:"https://youtu.be/wvcQg43_V8U?t=2584" },
        { id:47, name:"Find Missing Number in an Array",         difficulty:"Easy",   lc:"https://leetcode.com/problems/missing-number/", gfg:"https://bit.ly/3A2pKTh", yt:"https://youtu.be/bYWLJb3vCWY?t=58" },
        { id:48, name:"Maximum Consecutive Ones",                difficulty:"Easy",   lc:"https://leetcode.com/problems/max-consecutive-ones/", gfg:"https://bit.ly/3piuaAN", yt:"https://youtu.be/bYWLJb3vCWY?t=1124" },
        { id:49, name:"Find the Number Appearing Once",          difficulty:"Easy",   lc:"https://leetcode.com/problems/single-number/", gfg:"https://bit.ly/3dudCD8", yt:"https://youtu.be/bYWLJb3vCWY?t=1369" },
        { id:50, name:"Longest Subarray with Given Sum (Positives)", difficulty:"Easy", lc:null, gfg:null, yt:"https://youtu.be/frf7qxiN2qU" },
        { id:51, name:"Longest Subarray with Sum K (Pos + Neg)", difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3dyZdp3", yt:"https://youtu.be/frf7qxiN2qU" },
      ]},
      { id: "3.2", title: "Arrays — Medium", problems: [
        { id:52, name:"2Sum Problem",                            difficulty:"Medium", lc:"https://leetcode.com/problems/two-sum/", gfg:"https://bit.ly/3SVYU8f", yt:"https://www.youtube.com/watch?v=UXDSeD9mN-k", patternTags:["Two Pointer", "Hashing"] },
        { id:53, name:"Sort an Array of 0s, 1s and 2s",         difficulty:"Medium", lc:"https://leetcode.com/problems/sort-colors/", gfg:"https://bit.ly/3dsROaZ", yt:"https://www.youtube.com/watch?v=tp8JIuCXBaU", patternTags:["Two Pointer"] },
        { id:54, name:"Majority Element (> n/2 times)",         difficulty:"Medium", lc:"https://leetcode.com/problems/majority-element/", gfg:"https://bit.ly/3SSpeA3", yt:"https://www.youtube.com/watch?v=nP_ns3uSh80" },
        { id:55, name:"Kadane's Algorithm — Maximum Subarray Sum", difficulty:"Medium", lc:"https://leetcode.com/problems/maximum-subarray/", gfg:"https://bit.ly/3dzyloY", yt:"https://www.youtube.com/watch?v=AHZpyENo7k4", patternTags:["Kadane's Algorithm", "DP"] },
        { id:56, name:"Print Subarray with Maximum Sum",         difficulty:"Medium", lc:"https://leetcode.com/problems/maximum-subarray/", gfg:null, yt:"https://www.youtube.com/watch?v=AHZpyENo7k4", patternTags:["Kadane's Algorithm", "DP"] },
        { id:57, name:"Stock Buy and Sell",                      difficulty:"Medium", lc:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", gfg:"https://bit.ly/3DsRL4r", yt:"https://www.youtube.com/watch?v=excAOvwF_Wk", patternTags:["Greedy"] },
        { id:58, name:"Rearrange Array in Alternating +/- Sign", difficulty:"Medium", lc:"https://leetcode.com/problems/rearrange-array-elements-by-sign/", gfg:null, yt:"https://www.youtube.com/watch?v=h4aBagy4dhk", patternTags:["Two Pointer"] },
        { id:59, name:"Next Permutation",                        difficulty:"Medium", lc:"https://leetcode.com/problems/next-permutation/", gfg:"https://bit.ly/3DuMbre", yt:"https://www.youtube.com/watch?v=JDOXKqF60RQ", patternTags:["Two Pointer"] },
        { id:60, name:"Leaders in an Array",                     difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FZ5UfW", yt:"https://www.youtube.com/watch?v=cHrIT5TKA6A" },
        { id:61, name:"Longest Consecutive Sequence",            difficulty:"Medium", lc:"https://leetcode.com/problems/longest-consecutive-sequence/", gfg:"https://bit.ly/3Peq4Uo", yt:"https://www.youtube.com/watch?v=oO5uLE7EUlM", patternTags:["Hashing"] },
        { id:62, name:"Set Matrix Zeros",                        difficulty:"Medium", lc:"https://leetcode.com/problems/set-matrix-zeroes/", gfg:"https://bit.ly/3JsrJBf", yt:"https://www.youtube.com/watch?v=N0MgLvceX7M", patternTags:["Matrix"] },
        { id:63, name:"Rotate Matrix by 90 Degrees",             difficulty:"Medium", lc:"https://leetcode.com/problems/rotate-image/", gfg:"https://bit.ly/3Q3BSPE", yt:"https://www.youtube.com/watch?v=Z0R2u6gd3GU", patternTags:["Matrix"] },
        { id:64, name:"Spiral Traversal of Matrix",              difficulty:"Medium", lc:"https://leetcode.com/problems/spiral-matrix/", gfg:"https://bit.ly/3Pnywrd", yt:"https://www.youtube.com/watch?v=3Zv1H7ZECqM", patternTags:["Matrix"] },
        { id:65, name:"Count Subarrays with Given Sum",          difficulty:"Medium", lc:"https://leetcode.com/problems/subarray-sum-equals-k/", gfg:"https://bit.ly/3DlmzeV", yt:"https://www.youtube.com/watch?v=xvNwoz-ufXA", patternTags:["Prefix Sum", "Hashing"] },
      ]},
      { id: "3.3", title: "Arrays — Hard", problems: [
        { id:66, name:"Pascal's Triangle",                       difficulty:"Hard",   lc:"https://leetcode.com/problems/pascals-triangle/", gfg:"https://bit.ly/3MH0Xhb", yt:"https://www.youtube.com/watch?v=bR7mQgwQ_o8" },
        { id:67, name:"Majority Element (n/3 times)",            difficulty:"Hard",   lc:"https://leetcode.com/problems/majority-element-ii/", gfg:"https://bit.ly/3Etg6Bb", yt:"https://www.youtube.com/watch?v=vwZj1K0e9U8" },
        { id:68, name:"3-Sum Problem",                           difficulty:"Hard",   lc:"https://leetcode.com/problems/3sum/", gfg:"https://bit.ly/3MJKRxS", yt:"https://www.youtube.com/watch?v=DhFh8Kw7ymk", patternTags:["Two Pointer", "Sorting"] },
        { id:69, name:"4-Sum Problem",                           difficulty:"Hard",   lc:"https://leetcode.com/problems/4sum/", gfg:"https://bit.ly/3It5SyP", yt:"https://www.youtube.com/watch?v=eD95WRfh81c", patternTags:["Two Pointer", "Sorting"] },
        { id:70, name:"Largest Subarray with 0 Sum",             difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3rRkdIm", yt:"https://www.youtube.com/watch?v=xmguZ6GbatA", patternTags:["Prefix Sum", "Hashing"] },
        { id:71, name:"Count Subarrays with given XOR K",        difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3JdpMNe", yt:"https://www.youtube.com/watch?v=eZr-6p0B7ME", patternTags:["Prefix Sum", "Hashing", "Bit Manipulation"] },
        { id:72, name:"Merge Overlapping Subintervals",          difficulty:"Hard",   lc:"https://leetcode.com/problems/merge-intervals/", gfg:"https://bit.ly/3w40Xzc", yt:"https://www.youtube.com/watch?v=IexN60k62jo", patternTags:["Sorting", "Intervals"] },
        { id:73, name:"Merge Two Sorted Arrays Without Extra Space", difficulty:"Hard", lc:"https://leetcode.com/problems/merge-sorted-array/", gfg:"https://bit.ly/3E1TJqu", yt:"https://www.youtube.com/watch?v=n7uwj04E0I4" },
        { id:74, name:"Find the Repeating and Missing Number",   difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3Peqzme", yt:"https://www.youtube.com/watch?v=2D0D8HE6uak" },
        { id:75, name:"Count Inversions",                        difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3gfxTm7", yt:"https://www.youtube.com/watch?v=AseUmwVNaoY" },
        { id:76, name:"Reverse Pairs",                           difficulty:"Hard",   lc:"https://leetcode.com/problems/reverse-pairs/", gfg:"https://bit.ly/3DNszaG", yt:"https://www.youtube.com/watch?v=S6rsAlj_iB4", patternTags:["Merge Sort", "Divide and Conquer"] },
        { id:77, name:"Maximum Product Subarray",                difficulty:"Hard",   lc:"https://leetcode.com/problems/maximum-product-subarray/", gfg:"https://bit.ly/3gZGaQH", yt:"https://www.youtube.com/watch?v=hnswaLJvr6g", patternTags:["DP"] },
      ]},
    ]
};

const TOPIC_BINARY_SEARCH = {
    stepId: "step4", stepTitle: "Step 4: Binary Search", color: "#F59E0B",
    subtopics: [
      { id: "4.1", title: "BS on 1D Arrays", problems: [
        { id:200, name:"Binary Search to find X in sorted array",        difficulty:"Easy",   lc:"https://leetcode.com/problems/binary-search/", gfg:"https://bit.ly/3uOoxBR", yt:"https://youtu.be/MHf6awe89xw", patternTags:["Binary Search"] },
        { id:201, name:"Implement Lower Bound",                          difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3SBxvb8", yt:"https://youtu.be/asWf1wHosCM", patternTags:["Binary Search"] },
        { id:202, name:"Implement Upper Bound",                          difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/problems/implement-upper-bound/1", yt:"https://youtu.be/asWf1wHosCM", patternTags:["Binary Search"] },
        { id:203, name:"Search Insert Position",                         difficulty:"Easy",   lc:"https://leetcode.com/problems/search-insert-position/", gfg:"https://www.geeksforgeeks.org/problems/search-insert-position-of-k-in-a-sorted-array/1", yt:"https://youtu.be/F-Lu1qid6V8", patternTags:["Binary Search"] },
        { id:204, name:"Floor and Ceil in Sorted Array",                 difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3rwApSc", yt:"https://youtu.be/dgM3X4kjvkY", patternTags:["Binary Search"] },
        { id:205, name:"First and Last Occurrence in Sorted Array",      difficulty:"Medium", lc:"https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", gfg:"https://bit.ly/3UjFvJW", yt:"https://youtu.be/JrQncFKf1y8", patternTags:["Binary Search"] },
        { id:206, name:"Count Occurrences in Sorted Array",              difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3CHiTLn", yt:"https://youtu.be/U42edWdQGEY", patternTags:["Binary Search"] },
        { id:207, name:"Search in Rotated Sorted Array I",               difficulty:"Medium", lc:"https://leetcode.com/problems/search-in-rotated-sorted-array/", gfg:"https://bit.ly/3UfPP9r", yt:"https://youtu.be/r3pMQ8-Ad5s", patternTags:["Binary Search"] },
        { id:208, name:"Search in Rotated Sorted Array II",              difficulty:"Medium", lc:"https://leetcode.com/problems/search-in-rotated-sorted-array-ii/", gfg:"https://bit.ly/3UfQqJI", yt:"https://youtu.be/w2G2W6zZmYY", patternTags:["Binary Search"] },
        { id:209, name:"Find Minimum in Rotated Sorted Array",           difficulty:"Medium", lc:"https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", gfg:"https://bit.ly/3SBcb6V", yt:"https://youtu.be/4rTSi8bnoFE", patternTags:["Binary Search"] },
        { id:210, name:"Find how many times array is rotated",          difficulty:"Medium", lc:null, gfg:"https://bit.ly/3CKxTwx", yt:"https://youtu.be/jSmwmkbfgZ4", patternTags:["Binary Search"] },
        { id:211, name:"Single Element in a Sorted Array",               difficulty:"Medium", lc:"https://leetcode.com/problems/single-element-in-a-sorted-array/", gfg:"https://bit.ly/3CHpReQ", yt:"https://youtu.be/PzXSps6sERg", patternTags:["Binary Search"] },
        { id:212, name:"Find Peak Element",                              difficulty:"Hard",   lc:"https://leetcode.com/problems/find-peak-element/", gfg:"https://bit.ly/3rzYbZv", yt:"https://youtu.be/cZ_LCdcKEUw", patternTags:["Binary Search"] },
      ]},
      { id: "4.2", title: "BS on Answers", problems: [
        { id:213, name:"Find Square Root of a Number",                   difficulty:"Easy",   lc:"https://leetcode.com/problems/sqrtx/", gfg:"https://bit.ly/3rwwo8u", yt:"https://youtu.be/F3jyy1JmTAY", patternTags:["Binary Search"] },
        { id:214, name:"Find Nth Root of a Number",                      difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3Su5pQ4", yt:"https://youtu.be/WfQEzfaPe-A", patternTags:["Binary Search"] },
        { id:215, name:"Koko Eating Bananas",                            difficulty:"Medium", lc:"https://leetcode.com/problems/koko-eating-bananas/", gfg:"https://bit.ly/3CFvA3s", yt:"https://youtu.be/CVqEdHDQv8I", patternTags:["Binary Search"] },
        { id:216, name:"Minimum Days to Make M Bouquets",                difficulty:"Medium", lc:"https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/", gfg:"https://bit.ly/3FfXIAi", yt:"https://youtu.be/4lqaflmrCYU", patternTags:["Binary Search"] },
        { id:217, name:"Find the Smallest Divisor Given a Threshold",    difficulty:"Medium", lc:"https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/", gfg:"https://bit.ly/3UfqVcN", yt:"https://youtu.be/h9b8jx8oVe8", patternTags:["Binary Search"] },
        { id:218, name:"Capacity to Ship Packages within D Days",        difficulty:"Medium", lc:"https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/", gfg:"https://bit.ly/3UoUEYY", yt:"https://youtu.be/lhSi8ECt9Hs", patternTags:["Binary Search"] },
        { id:219, name:"Kth Missing Positive Number",                    difficulty:"Easy",   lc:"https://leetcode.com/problems/kth-missing-positive-number/", gfg:null, yt:"https://youtu.be/-Eyj0_HBkXk", patternTags:["Binary Search"] },
        { id:220, name:"Aggressive Cows",                                difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3UoUuYf", yt:"https://youtu.be/abLecKsj8gA", patternTags:["Binary Search"] },
        { id:221, name:"Book Allocation Problem",                        difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3CMlVMU", yt:"https://youtu.be/2JpAJjACS-w", patternTags:["Binary Search"] },
        { id:222, name:"Split Array — Largest Sum",                      difficulty:"Hard",   lc:"https://leetcode.com/problems/split-array-largest-sum/", gfg:"https://bit.ly/3SY1Eqz", yt:"https://youtu.be/_374SbcbsT8", patternTags:["Binary Search"] },
        { id:223, name:"Painter's Partition Problem",                    difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3F08jUH", yt:"https://youtu.be/SHOSnnQjjkY", patternTags:["Binary Search"] },
        { id:224, name:"Minimize Max Distance to Gas Station",           difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3UoUYbE", yt:"https://youtu.be/D69bxX1mb2I", patternTags:["Binary Search"] },
        { id:225, name:"Median of Two Sorted Arrays",                    difficulty:"Hard",   lc:"https://leetcode.com/problems/median-of-two-sorted-arrays/", gfg:"https://bit.ly/3rzMVN5", yt:"https://youtu.be/NTop3VTjmxk", patternTags:["Binary Search"] },
        { id:226, name:"K-th Element of Two Sorted Arrays",              difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3CMxOPP", yt:"https://youtu.be/F3o7ms94MQM", patternTags:["Binary Search"] },
      ]},
      { id: "4.3", title: "BS on 2D Arrays", problems: [
        { id:227, name:"Find the Row with Maximum 1s",                   difficulty:"Medium", lc:null, gfg:"https://bit.ly/3CKaq5b", yt:"https://youtu.be/Zk39FF_h2tk", patternTags:["Binary Search", "Matrix"] },
        { id:228, name:"Search in a 2D Matrix",                          difficulty:"Medium", lc:"https://leetcode.com/problems/search-a-2d-matrix/", gfg:"https://bit.ly/3SVCKwH", yt:"https://youtu.be/h1d4hb-l5xY", patternTags:["Binary Search", "Matrix"] },
        { id:229, name:"Search in a 2D Matrix II",                       difficulty:"Medium",   lc:"https://leetcode.com/problems/search-a-2d-matrix-ii/", gfg:"https://bit.ly/3UoVAGr", yt:"https://youtu.be/MQc4SeAGS04", patternTags:["Binary Search", "Matrix"] },
        { id:230, name:"Find Peak Element (2D Matrix)",                  difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3UoVCmM", yt:"https://youtu.be/eD3CxhAY-1k", patternTags:["Binary Search", "Matrix"] },
        { id:231, name:"Median in a Row-wise Sorted Matrix",             difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3rySrbS", yt:"https://youtu.be/63dRWLs8Ev4", patternTags:["Binary Search", "Matrix"] },
      ]},
    ]
};

const TOPIC_STRINGS = {
    stepId: "step5", stepTitle: "Step 5: Strings", color: "#EC4899",
    subtopics: [
      { id: "5.1", title: "Strings — Basic", problems: [
        { id:250, name:"Remove Outermost Parentheses",                  difficulty:"Easy",   lc:"https://leetcode.com/problems/remove-outermost-parentheses/", gfg:null, yt:"https://youtu.be/UXraB-VYSWQ", patternTags:["Strings"] },
        { id:251, name:"Reverse Words in a String",                     difficulty:"Easy",   lc:"https://leetcode.com/problems/reverse-words-in-a-string/", gfg:"https://bit.ly/3UkBIzx", yt:"https://youtu.be/Y6llV1Wcd6g", patternTags:["Strings"] },
        { id:252, name:"Largest Odd Number in String",                  difficulty:"Easy",   lc:"https://leetcode.com/problems/largest-odd-number-in-string/", gfg:null, yt:"https://youtu.be/4ptiqCRDmTI", patternTags:["Strings"] },
        { id:253, name:"Longest Common Prefix",                         difficulty:"Easy",   lc:"https://leetcode.com/problems/longest-common-prefix/", gfg:"https://bit.ly/3Sd0pZf", yt:"https://youtu.be/0sWShKIJoo4", patternTags:["Strings"] },
        { id:254, name:"Isomorphic Strings",                            difficulty:"Easy",   lc:"https://leetcode.com/problems/isomorphic-strings/", gfg:"https://bit.ly/3SkO0OV", yt:"https://youtu.be/SU617cTmO6I", patternTags:["Strings", "Hashing"] },
        { id:255, name:"Check Whether One String is a Rotation of Another", difficulty:"Easy", lc:"https://leetcode.com/problems/rotate-string/", gfg:"https://bit.ly/3eC8mw6", yt:"https://youtu.be/HsVk0Wc4M5M", patternTags:["Strings"] },
        { id:256, name:"Check if Two Strings are Anagram",              difficulty:"Easy",   lc:"https://leetcode.com/problems/valid-anagram/", gfg:"https://bit.ly/3Cv9TQt", yt:"https://youtu.be/V73fEcUVwTI", patternTags:["Strings", "Hashing"] },
      ]},
      { id: "5.2", title: "Strings — Medium/Hard", problems: [
        { id:257, name:"Sort Characters by Frequency",                  difficulty:"Medium", lc:"https://leetcode.com/problems/sort-characters-by-frequency/", gfg:"https://bit.ly/3eFAtuG", yt:"https://youtu.be/Y6m0ATahsi8", patternTags:["Strings", "Hashing", "Sorting"] },
        { id:258, name:"Maximum Nesting Depth of Parentheses",          difficulty:"Medium",   lc:"https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/", gfg:null, yt:"https://youtu.be/eN1ad7t8U0c", patternTags:["Strings", "Stack"] },
        { id:259, name:"Roman Number to Integer and Vice Versa",        difficulty:"Medium", lc:"https://leetcode.com/problems/roman-to-integer/", gfg:"https://bit.ly/3Cw1k49", yt:"https://youtu.be/Q5RagqQGCXM", patternTags:["Strings", "Greedy"] },
        { id:260, name:"Implement ATOI / STRSTR",                       difficulty:"Medium",   lc:"https://leetcode.com/problems/string-to-integer-atoi/", gfg:"https://bit.ly/3UpJzlV", yt:"https://youtu.be/c3hXnRMHpZk", patternTags:["Strings"] },
        { id:261, name:"Count Number of Substrings",                    difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3SkVuwL", yt:"https://youtu.be/CMpDDP-LzVU", patternTags:["Strings", "Sliding Window"] },
        { id:262, name:"Longest Palindromic Substring",                 difficulty:"Medium", lc:"https://leetcode.com/problems/longest-palindromic-substring/", gfg:"https://bit.ly/3eF3wT9", yt:"https://youtu.be/XYQecbcd6_c", patternTags:["Strings", "DP"] },
        { id:263, name:"Sum of Beauty of All Substrings",               difficulty:"Medium", lc:"https://leetcode.com/problems/sum-of-beauty-of-all-substrings/", gfg:null, yt:"https://youtu.be/-FNCsTzfDtY", patternTags:["Strings"] },
        { id:264, name:"Reverse Every Word in a Given String",          difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/problems/reverse-each-word-in-a-given-string1001/1", yt:"https://youtu.be/Y6llV1Wcd6g", patternTags:["Strings"] },
      ]},
    ]
};

const TOPIC_LINKED_LIST = {
    stepId: "step6", stepTitle: "Step 6: Learn LinkedList", color: "#06B6D4",
    subtopics: [
      { id: "6.1", title: "Learn 1D LinkedList", problems: [
        { id:280, name:"Introduction to LinkedList",              difficulty:"Easy", lc:null, gfg:"https://bit.ly/3CGCnvm", yt:"https://youtu.be/zLhLLOms2tg", patternTags:["Linked List"] },
        { id:281, name:"Inserting a node in LinkedList",          difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3UoO0wL", yt:"https://youtu.be/jVHTuOTLwQk", patternTags:["Linked List"] },
        { id:282, name:"Deleting a node in LinkedList",           difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3FbiwHi", yt:"https://youtu.be/JHCpwfx2sNc", patternTags:["Linked List"] },
        { id:283, name:"Find the Length of the LinkedList",       difficulty:"Easy", lc:null, gfg:"https://bit.ly/3SQ0FOt", yt:"https://youtu.be/IsoQTyJDk2k", patternTags:["Linked List"] },
        { id:284, name:"Search an Element in the LL",             difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3FcTRnD", yt:"https://youtu.be/X3X18cY8RtY", patternTags:["Linked List"] },
      ]},
      { id: "6.2", title: "Learn Doubly LinkedList", problems: [
        { id:285, name:"Introduction to DLL",                     difficulty:"Easy", lc:null, gfg:"https://bit.ly/3SK8mvg", yt:"https://youtu.be/sE0fa3ItpHg", patternTags:["Linked List"] },
        { id:286, name:"Insert a node in DLL",                    difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3UqAJsP", yt:"https://youtu.be/SbVEXx_l0ng", patternTags:["Linked List"] },
        { id:287, name:"Delete a node in DLL",                    difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3FcW3J0", yt:"https://youtu.be/eVy0qcPYRb4", patternTags:["Linked List"] },
        { id:288, name:"Reverse a DLL",                           difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3SOPzdr", yt:"https://youtu.be/u0WrxfRza1A", patternTags:["Linked List"] },
      ]},
      { id: "6.3", title: "Medium Problems of LL", problems: [
        { id:289, name:"Middle of a LinkedList",                  difficulty:"Medium",   lc:"https://leetcode.com/problems/middle-of-the-linked-list/", gfg:"https://bit.ly/3UoXgVi", yt:"https://youtu.be/sGdwSH8RK-o", patternTags:["Linked List", "Two Pointer"] },
        { id:290, name:"Reverse a LinkedList",                    difficulty:"Medium",  lc:"https://leetcode.com/problems/reverse-linked-list/", gfg:"https://bit.ly/3UoXC4d", yt:"https://youtu.be/D2vI2DNJGd8", patternTags:["Linked List"] },
        { id:291, name:"Detect a Loop in LL",                     difficulty:"Medium", lc:"https://leetcode.com/problems/linked-list-cycle/", gfg:"https://bit.ly/3CGD4Wn", yt:"https://youtu.be/wiOq7VVr-IA", patternTags:["Linked List", "Two Pointer"] },
        { id:292, name:"Find the Starting Point of LL",           difficulty:"Medium", lc:"https://leetcode.com/problems/linked-list-cycle-ii/", gfg:"https://bit.ly/3UoYbCD", yt:"https://youtu.be/2Kd0g3wonOY", patternTags:["Linked List", "Two Pointer"] },
        { id:293, name:"Length of Loop in LL",                    difficulty:"Easy", lc:null, gfg:"https://bit.ly/3SLwf3F", yt:"https://youtu.be/I4g1qbkTPus", patternTags:["Linked List", "Two Pointer"] },
        { id:294, name:"Check if LL is Palindrome",               difficulty:"Medium", lc:"https://leetcode.com/problems/palindrome-linked-list/", gfg:"https://bit.ly/3FaCwvD", yt:"https://youtu.be/-DA4BGGiHTQ", patternTags:["Linked List", "Two Pointer"] },
        { id:295, name:"Segregate Odd and Even Nodes in LL",      difficulty:"Medium", lc:"https://leetcode.com/problems/odd-even-linked-list/", gfg:null, yt:"https://youtu.be/qcEAA5Sw_dY", patternTags:["Linked List"] },
        { id:296, name:"Remove Nth Node from the Back of LL",     difficulty:"Medium", lc:"https://leetcode.com/problems/remove-nth-node-from-end-of-list/", gfg:"https://bit.ly/3SLxnz1", yt:"https://youtu.be/Th7Hbm5DPKw", patternTags:["Linked List", "Two Pointer"] },
        { id:297, name:"Delete the Middle Node of LL",            difficulty:"Medium", lc:"https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/", gfg:null, yt:"https://youtu.be/EE2OSjlfTM4", patternTags:["Linked List", "Two Pointer"] },
        { id:298, name:"Sort a LinkedList",                       difficulty:"Medium", lc:"https://leetcode.com/problems/sort-list/", gfg:"https://bit.ly/3rzeeel", yt:"https://youtu.be/TGfQu0bSNI0", patternTags:["Linked List", "Merge Sort"] },
        { id:299, name:"Sort a LL of 0's, 1's and 2's",          difficulty:"Easy", lc:null, gfg:"https://bit.ly/3eJVDtY", yt:"https://youtu.be/RhqXjAh8t1s", patternTags:["Linked List"] },
        { id:300, name:"Find the Intersection Point of Y LL",     difficulty:"Medium", lc:"https://leetcode.com/problems/intersection-of-two-linked-lists/", gfg:"https://bit.ly/3CHzWO0", yt:"https://youtu.be/0DYoPz2Tpt4", patternTags:["Linked List", "Two Pointer"] },
        { id:301, name:"Add 1 to a Number Represented by LinkedList", difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FdHzCx", yt:"https://youtu.be/aLZRdf2nQzI", patternTags:["Linked List"] },
        { id:302, name:"Add 2 Numbers in LinkedList",             difficulty:"Medium", lc:"https://leetcode.com/problems/add-two-numbers/", gfg:"https://bit.ly/3SOMS1y", yt:"https://youtu.be/XmRrGzR6udg", patternTags:["Linked List"] },
        { id:303, name:"Delete all occurrences of a key in DLL",  difficulty:"Medium", lc:null, gfg:null, yt:"https://youtu.be/RcMzC9P9DvE", patternTags:["Linked List"] },
      ]},
      { id: "6.4", title: "Medium Problems of DLL", problems: [
        { id:304, name:"Find pairs with given sum in DLL",         difficulty:"Medium", lc:null, gfg:"https://bit.ly/3rwbDFK", yt:"https://youtu.be/9OM5qllt4MY", patternTags:["Linked List", "Two Pointer"] },
        { id:305, name:"Remove duplicates from sorted DLL",        difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FfTKlp", yt:"https://youtu.be/aB1aN5pcyDY", patternTags:["Linked List"] },
        { id:306, name:"Reverse DLL in groups of given size K",   difficulty:"Medium",   lc:null, gfg:null, yt:"https://youtu.be/wH-DbWNasGY", patternTags:["Linked List"] },
      ]},
      { id: "6.5", title: "Hard Problems of LL", problems: [
        { id:307, name:"Rotate a LinkedList",                      difficulty:"Medium", lc:"https://leetcode.com/problems/rotate-list/", gfg:"https://bit.ly/3SOQXBl", yt:"https://youtu.be/9VPm6nEbVPA", patternTags:["Linked List"] },
        { id:308, name:"Reverse LinkedList in groups of size K",   difficulty:"Hard",   lc:"https://leetcode.com/problems/reverse-nodes-in-k-group/", gfg:"https://bit.ly/3FdLzgU", yt:"https://youtu.be/Of0HPkk3JgI", patternTags:["Linked List"] },
        { id:309, name:"Flattening of LL",                         difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3UqgEPN", yt:"https://youtu.be/ZQR9Y8E1Cdo", patternTags:["Linked List", "Merge Sort"] },
        { id:310, name:"Clone a Linked List with random and next pointer", difficulty:"Hard", lc:"https://leetcode.com/problems/copy-list-with-random-pointer/", gfg:"https://bit.ly/3UqgQfg", yt:"https://youtu.be/VNf6VynfpdM", patternTags:["Linked List", "Hashing"] },
      ]},
    ]
};

const TOPIC_RECURSION = {
    stepId: "step7", stepTitle: "Step 7: Recursion [PatternWise]", color: "#8B5CF6",
    subtopics: [
      { id: "7.1", title: "Get a Strong Hold", problems: [
        { id:320, name:"Recursive Implementation of atoi()",     difficulty:"Medium",   lc:"https://leetcode.com/problems/string-to-integer-atoi/", gfg:"https://bit.ly/3UpJzlV", yt:"https://youtu.be/c3hXnRMHpZk", patternTags:["Recursion"] },
        { id:321, name:"Pow(x, n)",                              difficulty:"Medium", lc:"https://leetcode.com/problems/powx-n/", gfg:"https://bit.ly/3FdW7tt", yt:"https://youtu.be/l0YC3876qxg", patternTags:["Recursion"] },
        { id:322, name:"Count Good Numbers",                     difficulty:"Medium", lc:"https://leetcode.com/problems/count-good-numbers/", gfg:null, yt:"https://youtu.be/eUv3vy9wf6w", patternTags:["Recursion"] },
        { id:323, name:"Sort a Stack using Recursion",           difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3rxNgrR", yt:"https://youtu.be/8tNqXraB_Zo", patternTags:["Recursion", "Stack"] },
        { id:324, name:"Reverse a Stack using Recursion",        difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/problems/reverse-a-stack/1", yt:"https://youtu.be/-3do_yhcwgY", patternTags:["Recursion", "Stack"] },
      ]},
      { id: "7.2", title: "Subsequences Pattern", problems: [
        { id:325, name:"Generate all Binary Strings",            difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3W1OY8Z", yt:"https://youtu.be/lWy9YIvb9X4", patternTags:["Recursion", "Subsequences"] },
        { id:326, name:"Generate Parentheses",                   difficulty:"Medium", lc:"https://leetcode.com/problems/generate-parentheses/", gfg:null, yt:"https://youtu.be/s9fokUqJ76A", patternTags:["Recursion", "Backtracking"] },
        { id:327, name:"Generate Power Set",                     difficulty:"Medium", lc:"https://leetcode.com/problems/subsets/", gfg:"https://bit.ly/3CR1Wk6", yt:"https://youtu.be/b7AYbpM5YrE", patternTags:["Recursion", "Subsequences"] },
        { id:328, name:"Count All Subsequences with Sum K",      difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FfZGo5", yt:"https://youtu.be/9_Gjm0HF3uM", patternTags:["Recursion", "Subsequences"] },
        { id:329, name:"Check if there is a Subsequence with Sum K", difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/problems/check-if-given-array-is-a-subarray/1", yt:"https://youtu.be/9_Gjm0HF3uM", patternTags:["Recursion", "Subsequences"] },
        { id:330, name:"Combination Sum",                        difficulty:"Medium", lc:"https://leetcode.com/problems/combination-sum/", gfg:"https://bit.ly/3rzjF1c", yt:"https://youtu.be/G1fRTGRxXU8", patternTags:["Recursion", "Subsequences"] },
        { id:331, name:"Combination Sum II",                     difficulty:"Medium", lc:"https://leetcode.com/problems/combination-sum-ii/", gfg:"https://bit.ly/3rzkmZ4", yt:"https://youtu.be/G1fRTGRxXU8", patternTags:["Recursion", "Subsequences"] },
        { id:332, name:"Subset Sum I",                           difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FgaQv9", yt:"https://youtu.be/9oI8Sb02ON4", patternTags:["Recursion", "Subsequences"] },
        { id:333, name:"Subset Sum II",                          difficulty:"Medium", lc:"https://leetcode.com/problems/subsets-ii/", gfg:"https://bit.ly/3UqOtkp", yt:"https://youtu.be/AB6Ei2ColIk", patternTags:["Recursion", "Subsequences"] },
        { id:334, name:"Combination Sum III",                    difficulty:"Medium", lc:"https://leetcode.com/problems/combination-sum-iii/", gfg:null, yt:"https://youtu.be/G1fRTGRxXU8", patternTags:["Recursion", "Subsequences"] },
        { id:335, name:"Letter Combinations of a Phone Number",  difficulty:"Medium", lc:"https://leetcode.com/problems/letter-combinations-of-a-phone-number/", gfg:"https://bit.ly/3UqOL0V", yt:"https://youtu.be/BMxBSQVkqT8", patternTags:["Recursion", "Subsequences"] },
        { id:336, name:"Palindrome Partitioning",                difficulty:"Medium", lc:"https://leetcode.com/problems/palindrome-partitioning/", gfg:"https://bit.ly/3SU9Fxc", yt:"https://youtu.be/_rgWtxJOZNc", patternTags:["Recursion", "Subsequences"] },
        { id:337, name:"Word Search",                            difficulty:"Medium", lc:"https://leetcode.com/problems/word-search/", gfg:"https://bit.ly/3FeUd23", yt:"https://youtu.be/asLavszr3Pg", patternTags:["Recursion", "Backtracking"] },
      ]},
      { id: "7.3", title: "Trying out all Combos / Hard", problems: [
        { id:338, name:"N Queens",                               difficulty:"Hard",   lc:"https://leetcode.com/problems/n-queens/", gfg:"https://bit.ly/3rxgWbf", yt:"https://youtu.be/i05Ju7AftcM", patternTags:["Recursion", "Backtracking"] },
        { id:339, name:"Rat in a Maze",                          difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3SUaPJZ", yt:"https://youtu.be/bld_Bnm4ywI", patternTags:["Recursion", "Backtracking"] },
        { id:340, name:"Word Break",                             difficulty:"Medium", lc:"https://leetcode.com/problems/word-break/", gfg:"https://bit.ly/3FeUiKQ", yt:"https://youtu.be/0OY-tJOukfg", patternTags:["Recursion", "DP"] },
        { id:341, name:"M Coloring Problem",                     difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3FfQiQt", yt:"https://youtu.be/wuVwUK25Rfc", patternTags:["Recursion", "Backtracking", "Graphs"] },
        { id:342, name:"Palindrome Partitioning II",             difficulty:"Hard",   lc:"https://leetcode.com/problems/palindrome-partitioning-ii/", gfg:"https://bit.ly/3SUaTw1", yt:"https://youtu.be/_rgWtxJOZNc", patternTags:["Recursion", "DP"] },
        { id:343, name:"Kth Permutation Sequence",               difficulty:"Hard",   lc:"https://leetcode.com/problems/permutation-sequence/", gfg:"https://bit.ly/3FgbZbs", yt:"https://youtu.be/QyBhJzqDcSk", patternTags:["Recursion"] },
        { id:344, name:"Permutations of a String/Array",         difficulty:"Medium", lc:"https://leetcode.com/problems/permutations/", gfg:"https://bit.ly/3roYDoH", yt:"https://youtu.be/YBzNi9rmTRA", patternTags:["Recursion", "Backtracking"] },
        { id:345, name:"All Paths from Source to Target",        difficulty:"Medium", lc:"https://leetcode.com/problems/all-paths-from-source-to-target/", gfg:null, yt:"https://youtu.be/ROZTYwbBcQk", patternTags:["Recursion", "Graphs"] },
      ]},
    ]
};

const TOPIC_BIT_MANIPULATION = {
    stepId: "step8", stepTitle: "Step 8: Bit Manipulation", color: "#22D3EE",
    subtopics: [
      { id: "8.1", title: "Learn Bit Manipulation", problems: [
        { id:350, name:"Introduction to Bit Manipulation",       difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3FaCtqf", yt:"https://youtu.be/iEh5xfns3MQ", patternTags:["Bit Manipulation"] },
        { id:351, name:"Check if the i-th Bit is Set/Unset",     difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3CMaVRH", yt:"https://youtu.be/2oGPODyq0kY", patternTags:["Bit Manipulation"] },
        { id:352, name:"Check if a Number is Odd",               difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3FeyEXm", yt:"https://youtu.be/2oGPODyq0kY", patternTags:["Bit Manipulation"] },
        { id:353, name:"Check if a Number is Power of 2",        difficulty:"Easy",   lc:"https://leetcode.com/problems/power-of-two/", gfg:"https://bit.ly/3UrfO5L", yt:"https://youtu.be/2oGPODyq0kY", patternTags:["Bit Manipulation"] },
        { id:354, name:"Count the Number of Set Bits",           difficulty:"Easy",   lc:"https://leetcode.com/problems/number-of-1-bits/", gfg:"https://bit.ly/3SVPyRr", yt:"https://youtu.be/iVTYa6F12Ko", patternTags:["Bit Manipulation"] },
        { id:355, name:"Set/Unset the Rightmost Unset Bit",      difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3SVQa1z", yt:"https://youtu.be/8wo6cVUFViI", patternTags:["Bit Manipulation"] },
        { id:356, name:"Swap Two Numbers",                       difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3FgdRG7", yt:"https://youtu.be/8wo6cVUFViI", patternTags:["Bit Manipulation"] },
        { id:357, name:"Divide Two Integers without Mul/Div/Mod",difficulty:"Medium", lc:"https://leetcode.com/problems/divide-two-integers/", gfg:"https://bit.ly/3CFjpZx", yt:"https://youtu.be/-W2-3Hbc-l8", patternTags:["Bit Manipulation"] },
      ]},
      { id: "8.2", title: "Interview Problems", problems: [
        { id:358, name:"Count Number of Bits to be Flipped",     difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3FgdjFV", yt:"https://youtu.be/Hf7nrJL1HKA", patternTags:["Bit Manipulation"] },
        { id:359, name:"Find the Number that Appears Odd Times", difficulty:"Easy", lc:"https://leetcode.com/problems/single-number/", gfg:"https://bit.ly/3FgdM9z", yt:"https://youtu.be/jrXa4XS-fb4", patternTags:["Bit Manipulation"] },
        { id:360, name:"Power Set — Print All Subsets",          difficulty:"Medium", lc:"https://leetcode.com/problems/subsets/", gfg:"https://bit.ly/3CR1Wk6", yt:"https://youtu.be/b7AYbpM5YrE", patternTags:["Bit Manipulation", "Recursion"] },
        { id:361, name:"Find XOR of Numbers from L to R",        difficulty:"Medium", lc:null, gfg:"https://bit.ly/3CR1WCl", yt:"https://youtu.be/lcfzMtaxsro", patternTags:["Bit Manipulation"] },
        { id:362, name:"Find the Two Numbers Appearing Odd Times",difficulty:"Medium", lc:"https://leetcode.com/problems/single-number-iii/", gfg:"https://bit.ly/3FgdM3M", yt:"https://youtu.be/sLOpY3oHfWY", patternTags:["Bit Manipulation"] },
      ]},
      { id: "8.3", title: "Advanced Maths", problems: [
        { id:363, name:"Print Prime Factors of a Number",        difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3SVR0o7", yt:"https://youtu.be/LT1Vge2Pjqo", patternTags:["Maths"] },
        { id:364, name:"All Divisors of a Number",               difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3CR2x3a", yt:"https://youtu.be/LT1Vge2Pjqo", patternTags:["Maths"] },
        { id:365, name:"Sieve of Eratosthenes",                  difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FgeBQO", yt:"https://youtu.be/LT1Vge2Pjqo", patternTags:["Maths"] },
        { id:3651, name:"Find Prime Factorisation using Sieve",  difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FgeBQO", yt:"https://youtu.be/LT1Vge2Pjqo", patternTags:["Maths"] },
        { id:366, name:"Find Power (x^n) with Modulo Value",     difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FdW7tt", yt:"https://youtu.be/l0YC3876qxg", patternTags:["Maths", "Recursion"] },
        { id:367, name:"Find GCD/HCF of Two Numbers",            difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3CR2QXa", yt:"https://youtu.be/LT1Vge2Pjqo", patternTags:["Maths"] },
      ]},
    ]
};

const TOPIC_STACK_QUEUES = {
    stepId: "step9", stepTitle: "Step 9: Stack and Queues", color: "#FB923C",
    subtopics: [
      { id: "9.1", title: "Learning", problems: [
        { id:380, name:"Implement Stack using Arrays",            difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3UrhP0u", yt:"https://youtu.be/GYptUgnIM_I", patternTags:["Stack"] },
        { id:381, name:"Implement Queue using Arrays",            difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3FfRSGn", yt:"https://youtu.be/jTYOFXsv1cM", patternTags:["Queue"] },
        { id:384, name:"Implement Stack using Queue",             difficulty:"Easy",   lc:"https://leetcode.com/problems/implement-stack-using-queues/", gfg:"https://bit.ly/3CSjqrr", yt:"https://youtu.be/jDZQKzEtbYE", patternTags:["Stack", "Queue"] },
        { id:385, name:"Implement Queue using Stack",             difficulty:"Medium", lc:"https://leetcode.com/problems/implement-queue-using-stacks/", gfg:"https://bit.ly/3CSjxNb", yt:"https://youtu.be/jTYOFXsv1cM", patternTags:["Stack", "Queue"] },
        { id:382, name:"Implement Stack using LinkedList",        difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3SUbsCl", yt:"https://youtu.be/GYptUgnIM_I", patternTags:["Stack", "Linked List"] },
        { id:383, name:"Implement Queue using LinkedList",        difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3FeVepW", yt:"https://youtu.be/jTYOFXsv1cM", patternTags:["Queue", "Linked List"] },
        { id:386, name:"Min Stack — getMin() in O(1) Time",      difficulty:"Medium", lc:"https://leetcode.com/problems/min-stack/", gfg:"https://bit.ly/3SVRgPq", yt:"https://youtu.be/V09NfaGCqGY", patternTags:["Stack"] },
        { id:387, name:"Check Redundant Brackets",               difficulty:"Medium", lc:null, gfg:"https://bit.ly/3SVRwbq", yt:"https://youtu.be/wkDfsKijrPI", patternTags:["Stack"] },
      ]},
      { id: "9.2", title: "Prefix, Infix, PostFix Conversion Problems", problems: [
        { id:388, name:"Infix to Postfix Conversion using Stack", difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FgfNji", yt:"https://youtu.be/m4lQNZIYsOQ", patternTags:["Stack"] },
        { id:389, name:"Prefix to Infix Conversion",             difficulty:"Medium", lc:null, gfg:"https://bit.ly/3CSk2Wk", yt:"https://youtu.be/m4lQNZIYsOQ", patternTags:["Stack"] },
        { id:390, name:"Prefix to Postfix Conversion",           difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FgfXxq", yt:"https://youtu.be/m4lQNZIYsOQ", patternTags:["Stack"] },
        { id:391, name:"Postfix to Prefix Conversion",           difficulty:"Medium", lc:null, gfg:"https://bit.ly/3SVS1mq", yt:"https://youtu.be/m4lQNZIYsOQ", patternTags:["Stack"] },
        { id:392, name:"Postfix to Infix Conversion",            difficulty:"Medium", lc:null, gfg:"https://bit.ly/3CSkb0G", yt:"https://youtu.be/m4lQNZIYsOQ", patternTags:["Stack"] },
        { id:393, name:"Convert Infix to Prefix Notation",       difficulty:"Medium", lc:null, gfg:"https://bit.ly/3Fgg6Vt", yt:"https://youtu.be/m4lQNZIYsOQ", patternTags:["Stack"] },
      ]},
      { id: "9.3", title: "Monotonic Stack/Queue Problems [VVV. Imp]", problems: [
        { id:394, name:"Next Greater Element",                   difficulty:"Easy",   lc:"https://leetcode.com/problems/next-greater-element-i/", gfg:"https://bit.ly/3SVSdJP", yt:"https://youtu.be/Class2_C--A", patternTags:["Stack", "Monotonic Stack"] },
        { id:395, name:"Next Greater Element II (Circular Array)",difficulty:"Medium", lc:"https://leetcode.com/problems/next-greater-element-ii/", gfg:"https://bit.ly/3FggKqz", yt:"https://youtu.be/Class2_C--A", patternTags:["Stack", "Monotonic Stack"] },
        { id:396, name:"Next Smaller Element",                   difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3CSkmza", yt:"https://youtu.be/Class2_C--A", patternTags:["Stack", "Monotonic Stack"] },
        { id:397, name:"Number of NGEs to the Right",            difficulty:"Medium", lc:null, gfg:"https://bit.ly/3SVSrJj", yt:"https://youtu.be/Class2_C--A", patternTags:["Stack", "Monotonic Stack"] },
        { id:398, name:"Trapping Rainwater",                     difficulty:"Hard",   lc:"https://leetcode.com/problems/trapping-rain-water/", gfg:"https://bit.ly/3FggVxV", yt:"https://youtu.be/CJ18A6f0wXE", patternTags:["Stack", "Two Pointer"] },
        { id:399, name:"Sum of Subarray Minimums",               difficulty:"Hard",   lc:"https://leetcode.com/problems/sum-of-subarray-minimums/", gfg:"https://bit.ly/3CSl1Yj", yt:"https://youtu.be/aJqkSOnZNiM", patternTags:["Stack", "Monotonic Stack"] },
        { id:400, name:"Asteroid Collision",                     difficulty:"Medium", lc:"https://leetcode.com/problems/asteroid-collision/", gfg:null, yt:"https://youtu.be/E97n9_jXmrI", patternTags:["Stack"] },
        { id:401, name:"Sum of Subarray Ranges",                 difficulty:"Medium", lc:"https://leetcode.com/problems/sum-of-subarray-ranges/", gfg:null, yt:"https://youtu.be/HrlTSrk5W6w", patternTags:["Stack", "Monotonic Stack"] },
        { id:402, name:"Remove K Digits",                        difficulty:"Medium", lc:"https://leetcode.com/problems/remove-k-digits/", gfg:"https://bit.ly/3FghDXr", yt:"https://youtu.be/cQDDtVXFP6M", patternTags:["Stack", "Monotonic Stack", "Greedy"] },
        { id:403, name:"Largest Rectangle in Histogram",         difficulty:"Hard",   lc:"https://leetcode.com/problems/largest-rectangle-in-histogram/", gfg:"https://bit.ly/3SVTV8z", yt:"https://youtu.be/X0X6G-eWyOU", patternTags:["Stack", "Monotonic Stack"] },
        { id:404, name:"Maximal Rectangle in Binary Matrix",     difficulty:"Hard",   lc:"https://leetcode.com/problems/maximal-rectangle/", gfg:"https://bit.ly/3SVU0kP", yt:"https://youtu.be/X0X6G-eWyOU", patternTags:["Stack", "Monotonic Stack", "Matrix"] },
      ]},
      { id: "9.4", title: "Implementation Problems", problems: [
        { id:405, name:"Sliding Window Maximum",                 difficulty:"Hard",   lc:"https://leetcode.com/problems/sliding-window-maximum/", gfg:"https://bit.ly/3SVU3QP", yt:"https://youtu.be/CZQGRp93K4k", patternTags:["Stack", "Sliding Window", "Monotonic Stack"] },
        { id:406, name:"Stock Span Problem",                     difficulty:"Medium", lc:"https://leetcode.com/problems/online-stock-span/", gfg:"https://bit.ly/3SVU3xN", yt:"https://youtu.be/slYh0ZNEqSc", patternTags:["Stack", "Monotonic Stack"] },
        { id:407, name:"The Celebrity Problem",                  difficulty:"Medium", lc:null, gfg:"https://bit.ly/3SVU5oN", yt:"https://youtu.be/-QQu1GIVeLc", patternTags:["Stack"] },
        { id:408, name:"LRU Cache (Implement)",                  difficulty:"Hard",   lc:"https://leetcode.com/problems/lru-cache/", gfg:"https://bit.ly/3FgicXr", yt:"https://youtu.be/RrR_OFCwsCQ", patternTags:["Linked List", "Hashing", "Design"] },
        { id:409, name:"LFU Cache (Implement)",                  difficulty:"Hard",   lc:"https://leetcode.com/problems/lfu-cache/", gfg:null, yt:"https://youtu.be/3vZ4HhfFFt0", patternTags:["Linked List", "Hashing", "Design"] },
      ]},
    ]
};

const TOPIC_SLIDING_WINDOW = {
    stepId: "step10", stepTitle: "Step 10: Sliding Window & Two Pointer Combined Problems", color: "#3FB950",
    subtopics: [
      { id: "10.1", title: "Medium Problems", problems: [
        { id:410, name:"Longest Substring Without Repeating Characters", difficulty:"Medium", lc:"https://leetcode.com/problems/longest-substring-without-repeating-characters/", gfg:"https://bit.ly/3UfXBb1", yt:"https://youtu.be/-zSxTJkcdAo", patternTags:["Sliding Window", "Two Pointer", "Hashing"] },
        { id:411, name:"Max Consecutive Ones III",                  difficulty:"Medium", lc:"https://leetcode.com/problems/max-consecutive-ones-iii/", gfg:"https://bit.ly/3SkO0OV", yt:"https://youtu.be/3E6S6VOyA3Q", patternTags:["Sliding Window", "Two Pointer"] },
        { id:412, name:"Fruit Into Baskets",                        difficulty:"Medium", lc:"https://leetcode.com/problems/fruit-into-baskets/", gfg:null, yt:"https://youtu.be/Gjcec0sppf0", patternTags:["Sliding Window", "Two Pointer", "Hashing"] },
        { id:413, name:"Longest Repeating Character Replacement",   difficulty:"Medium", lc:"https://leetcode.com/problems/longest-repeating-character-replacement/", gfg:null, yt:"https://youtu.be/00wXcDjsmTE", patternTags:["Sliding Window", "Two Pointer"] },
        { id:414, name:"Binary Subarray with Sum",                  difficulty:"Medium", lc:"https://leetcode.com/problems/binary-subarrays-with-sum/", gfg:null, yt:"https://youtu.be/MmDmsuTRwYw", patternTags:["Sliding Window", "Two Pointer"] },
        { id:415, name:"Count Number of Nice Subarrays",            difficulty:"Medium", lc:"https://leetcode.com/problems/count-number-of-nice-subarrays/", gfg:null, yt:"https://youtu.be/MmDmsuTRwYw", patternTags:["Sliding Window", "Two Pointer"] },
        { id:416, name:"Number of Substrings Containing All Three Characters", difficulty:"Medium", lc:"https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/", gfg:null, yt:"https://youtu.be/xtqN4qlgr8s", patternTags:["Sliding Window", "Two Pointer"] },
        { id:417, name:"Maximum Point You Can Obtain from Cards",   difficulty:"Medium", lc:"https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/", gfg:null, yt:"https://youtu.be/pBWCOCS636U", patternTags:["Sliding Window", "Two Pointer"] },
      ]},
      { id: "10.2", title: "Hard Problems", problems: [
        { id:418, name:"Longest Substring with At Most K Distinct Characters", difficulty:"Hard", lc:null, gfg:"https://www.geeksforgeeks.org/problems/longest-k-unique-characters-substring0853/1", yt:"https://youtu.be/UnFNoJxn2Pk", patternTags:["Sliding Window", "Two Pointer", "Hashing"] },
        { id:419, name:"Subarray with K Different Integers",        difficulty:"Hard",   lc:"https://leetcode.com/problems/subarrays-with-k-different-integers/", gfg:null, yt:"https://youtu.be/lkmRJqq9Q5o", patternTags:["Sliding Window", "Two Pointer", "Hashing"] },
        { id:420, name:"Minimum Window Substring",                  difficulty:"Hard",   lc:"https://leetcode.com/problems/minimum-window-substring/", gfg:"https://bit.ly/3FghQa4", yt:"https://youtu.be/qK6mp2_dV9c", patternTags:["Sliding Window", "Two Pointer", "Hashing"] },
        { id:421, name:"Minimum Window Subsequence",                difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/problems/minimum-window-subsequence/1", yt:"https://youtu.be/-7nx99cFge0", patternTags:["Sliding Window", "Two Pointer", "DP"] },
      ]},
    ]
};

const TOPIC_HEAPS = {
    stepId: "step11", stepTitle: "Step 11: Heaps [Learning, Medium, Hard Problems]", color: "#F472B6",
    subtopics: [
      { id: "11.1", title: "Learning", problems: [
        { id:430, name:"Introduction to Priority Queues using Binary Heaps", difficulty:"Easy", lc:null, gfg:"https://bit.ly/3UvY7ML", yt:"https://youtu.be/HqPJF2L5h9U", patternTags:["Heap"] },
        { id:431, name:"Min Heap and Max Heap Implementation",        difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3SY3xCQ", yt:"https://youtu.be/HqPJF2L5h9U", patternTags:["Heap"] },
        { id:432, name:"Check if an Array Represents a Min-Heap",    difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3Cz2P7m", yt:"https://youtu.be/HqPJF2L5h9U", patternTags:["Heap"] },
        { id:433, name:"Convert Min Heap to Max Heap",                difficulty:"Medium", lc:null, gfg:"https://bit.ly/3T0rJpV", yt:"https://youtu.be/HqPJF2L5h9U", patternTags:["Heap"] },
      ]},
      { id: "11.2", title: "Medium Problems", problems: [
        { id:434, name:"Kth Largest Element in an Array",             difficulty:"Medium", lc:"https://leetcode.com/problems/kth-largest-element-in-an-array/", gfg:"https://bit.ly/3rzbJ0K", yt:"https://youtu.be/0NSEdkdK6cQ", patternTags:["Heap"] },
        { id:435, name:"Kth Smallest Element in an Array",            difficulty:"Medium", lc:null, gfg:"https://bit.ly/3SYqLCi", yt:"https://youtu.be/0NSEdkdK6cQ", patternTags:["Heap"] },
        { id:436, name:"Sort a K Sorted or Nearly Sorted Array",      difficulty:"Medium", lc:null, gfg:"https://bit.ly/3F0jzGz", yt:"https://youtu.be/0NSEdkdK6cQ", patternTags:["Heap"] },
        { id:437, name:"K Closest Points to Origin",                  difficulty:"Medium", lc:"https://leetcode.com/problems/k-closest-points-to-origin/", gfg:null, yt:"https://youtu.be/0NSEdkdK6cQ", patternTags:["Heap"] },
        { id:438, name:"Top K Frequent Elements",                     difficulty:"Medium", lc:"https://leetcode.com/problems/top-k-frequent-elements/", gfg:"https://bit.ly/3T1Z2pR", yt:"https://youtu.be/YPTqKIgVk-k", patternTags:["Heap", "Hashing"] },
        { id:439, name:"Task Scheduler",                              difficulty:"Medium", lc:"https://leetcode.com/problems/task-scheduler/", gfg:null, yt:"https://youtu.be/s8p8ukTyceI", patternTags:["Heap", "Greedy"] },
        { id:440, name:"Hands of Straights",                          difficulty:"Medium", lc:"https://leetcode.com/problems/hand-of-straights/", gfg:null, yt:"https://youtu.be/0kPPpYwr1f8", patternTags:["Heap", "Greedy"] },
      ]},
      { id: "11.3", title: "Hard Problems", problems: [
        { id:441, name:"Design Twitter",                              difficulty:"Hard",   lc:"https://leetcode.com/problems/design-twitter/", gfg:null, yt:"https://youtu.be/qz9tKlF431k", patternTags:["Heap", "Design"] },
        { id:442, name:"Connect N Ropes with Minimum Cost",           difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3SXrZ7M", yt:"https://youtu.be/Nz7H2bdf3wU", patternTags:["Heap", "Greedy"] },
        { id:443, name:"Kth Largest Element in a Stream",             difficulty:"Medium",   lc:"https://leetcode.com/problems/kth-largest-element-in-a-stream/", gfg:"https://bit.ly/3rA3aJh", yt:"https://youtu.be/hOjcdrqMoQ8", patternTags:["Heap"] },
        { id:444, name:"Maximum Sum Combination",                     difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3SXsd3J", yt:"https://youtu.be/0Vc1V6sH7DI", patternTags:["Heap"] },
        { id:445, name:"Find Median from Data Stream",                difficulty:"Hard",   lc:"https://leetcode.com/problems/find-median-from-data-stream/", gfg:"https://bit.ly/3FagY7N", yt:"https://youtu.be/itmhHWaHupI", patternTags:["Heap", "Design"] },
        { id:446, name:"Distinct Numbers in Window",                  difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/problems/distinct-numbers-in-window/1", yt:"https://youtu.be/YPTqKIgVk-k", patternTags:["Heap", "Sliding Window", "Hashing"] },
        { id:4461, name:"Kth Largest Sum Contiguous Subarray",        difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/problems/k-th-largest-sum-contiguous-subarray/1", yt:"https://youtu.be/YPTqKIgVk-k", patternTags:["Heap"] },
      ]},
    ]
};

const TOPIC_GREEDY = {
    stepId: "step12", stepTitle: "Step 12: Greedy Algorithms [Easy, Medium/Hard]", color: "#FACC15",
    subtopics: [
      { id: "12.1", title: "Easy Problems", problems: [
        { id:447, name:"Assign Cookies",                              difficulty:"Easy",   lc:"https://leetcode.com/problems/assign-cookies/", gfg:null, yt:"https://youtu.be/DIX2p7vb9co", patternTags:["Greedy"] },
        { id:448, name:"Fractional Knapsack Problem",                 difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3FaW7n3", yt:"https://youtu.be/DIX2p7vb9co", patternTags:["Greedy"] },
        { id:449, name:"Greedy Algorithm to Find Minimum Number of Coins", difficulty:"Easy", lc:null, gfg:"https://bit.ly/3T2bN0u", yt:"https://youtu.be/DIX2p7vb9co", patternTags:["Greedy"] },
        { id:450, name:"Lemonade Change",                             difficulty:"Easy",   lc:"https://leetcode.com/problems/lemonade-change/", gfg:null, yt:"https://youtu.be/DIX2p7vb9co", patternTags:["Greedy"] },
      ]},
      { id: "12.2", title: "Medium/Hard", problems: [
        { id:451, name:"Valid Paranthesis String",                    difficulty:"Medium", lc:"https://leetcode.com/problems/valid-parenthesis-string/", gfg:null, yt:"https://youtu.be/cMpCpYwYqEY", patternTags:["Greedy", "Stack"] },
        { id:452, name:"N Meetings in One Room",                      difficulty:"Medium", lc:null, gfg:"https://bit.ly/3SY8uIA", yt:"https://youtu.be/ZIu5h0AmI3I", patternTags:["Greedy", "Sorting"] },
        { id:453, name:"Jump Game",                                   difficulty:"Medium", lc:"https://leetcode.com/problems/jump-game/", gfg:"https://bit.ly/3T2c8sM", yt:"https://youtu.be/M5VbZBmJiUo", patternTags:["Greedy"] },
        { id:454, name:"Jump Game II",                                difficulty:"Medium", lc:"https://leetcode.com/problems/jump-game-ii/", gfg:null, yt:"https://youtu.be/7SBmla0fXR4", patternTags:["Greedy"] },
        { id:455, name:"Minimum Number of Platforms Required for a Railway", difficulty:"Medium", lc:null, gfg:"https://bit.ly/3SXtNqz", yt:"https://youtu.be/RapEPQs7Ds4", patternTags:["Greedy", "Sorting"] },
        { id:456, name:"Job Sequencing Problem",                      difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FbeRjE", yt:"https://youtu.be/eY9MQqIH3so", patternTags:["Greedy", "Sorting"] },
        { id:457, name:"Candy",                                       difficulty:"Hard",   lc:"https://leetcode.com/problems/candy/", gfg:null, yt:"https://youtu.be/3T_NbjAVwq8", patternTags:["Greedy"] },
        { id:458, name:"Shortest Job First",                          difficulty:"Medium", lc:null, gfg:"https://bit.ly/3T2dG7e", yt:"https://youtu.be/dyQ4SoYiSQg", patternTags:["Greedy", "Sorting"] },
        { id:4581, name:"LRU Page Replacement Algorithm",             difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/problems/page-faults-in-lru5603/1", yt:"https://youtu.be/OWjzMQHGjPE", patternTags:["Greedy"] },
        { id:459, name:"Insert Interval",                             difficulty:"Medium", lc:"https://leetcode.com/problems/insert-interval/", gfg:null, yt:"https://youtu.be/ZBz5fjEcaa8", patternTags:["Greedy", "Intervals"] },
        { id:460, name:"Merge Non-overlapping Intervals",             difficulty:"Medium", lc:"https://leetcode.com/problems/merge-intervals/", gfg:"https://bit.ly/3w40Xzc", yt:"https://youtu.be/IexN60k62jo", patternTags:["Greedy", "Sorting", "Intervals"] },
        { id:461, name:"Non-overlapping Intervals",                   difficulty:"Medium", lc:"https://leetcode.com/problems/non-overlapping-intervals/", gfg:null, yt:"https://youtu.be/nONCGxWoUfM", patternTags:["Greedy", "Sorting", "Intervals"] },
      ]},
    ]
};

const TOPIC_BINARY_TREES = {
    stepId: "step13", stepTitle: "Step 13: Binary Trees [Traversals, Medium and Hard Problems]", color: "#60A5FA",
    subtopics: [
      { id: "13.1", title: "Traversals", problems: [
        { id:470, name:"Introduction to Trees",                       difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3T2eVxN", yt:"https://youtu.be/_ANrF3FJm70", patternTags:["Tree"] },
        { id:471, name:"Preorder Traversal of Binary Tree",           difficulty:"Easy",   lc:"https://leetcode.com/problems/binary-tree-preorder-traversal/", gfg:"https://bit.ly/3T2fA1m", yt:"https://youtu.be/_yVcARGmKHs", patternTags:["Tree", "DFS"] },
        { id:472, name:"Inorder Traversal of Binary Tree",            difficulty:"Easy",   lc:"https://leetcode.com/problems/binary-tree-inorder-traversal/", gfg:"https://bit.ly/3rDz4mC", yt:"https://youtu.be/_yVcARGmKHs", patternTags:["Tree", "DFS"] },
        { id:473, name:"Postorder Traversal of Binary Tree",          difficulty:"Easy",   lc:"https://leetcode.com/problems/binary-tree-postorder-traversal/", gfg:"https://bit.ly/3T2gJZx", yt:"https://youtu.be/_yVcARGmKHs", patternTags:["Tree", "DFS"] },
        { id:474, name:"Morris Traversal — Preorder and Inorder",     difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3FbgX0o", yt:"https://youtu.be/F5b7DnT-_-A", patternTags:["Tree", "DFS"] },
        { id:475, name:"Level Order Traversal / Binary Tree BFS",     difficulty:"Medium", lc:"https://leetcode.com/problems/binary-tree-level-order-traversal/", gfg:"https://bit.ly/3SY9TGT", yt:"https://youtu.be/EoJ2dxJgPmM", patternTags:["Tree", "BFS"] },
        { id:476, name:"Iterative Preorder Traversal",                difficulty:"Medium", lc:"https://leetcode.com/problems/binary-tree-preorder-traversal/", gfg:"https://bit.ly/3T2fA1m", yt:"https://youtu.be/jfWTGqNBwYY", patternTags:["Tree", "DFS", "Stack"] },
        { id:477, name:"Iterative Inorder Traversal",                 difficulty:"Medium", lc:"https://leetcode.com/problems/binary-tree-inorder-traversal/", gfg:"https://bit.ly/3rDz4mC", yt:"https://youtu.be/4VqkWtsT0OQ", patternTags:["Tree", "DFS", "Stack"] },
        { id:478, name:"Iterative Postorder Traversal Using 2 Stacks",difficulty:"Medium", lc:"https://leetcode.com/problems/binary-tree-postorder-traversal/", gfg:"https://bit.ly/3T2gJZx", yt:"https://youtu.be/Df9GnNHkLwY", patternTags:["Tree", "DFS", "Stack"] },
        { id:479, name:"Postorder Traversal Using 1 Stack",           difficulty:"Hard",   lc:"https://leetcode.com/problems/binary-tree-postorder-traversal/", gfg:"https://bit.ly/3T2gJZx", yt:"https://youtu.be/QhszUQhGGlA", patternTags:["Tree", "DFS", "Stack"] },
        { id:480, name:"Preorder, Inorder, Postorder in a Single Traversal", difficulty:"Hard", lc:null, gfg:"https://bit.ly/3Fc4QbF", yt:"https://youtu.be/asWro14MR8c", patternTags:["Tree", "DFS", "Stack"] },
        { id:506, name:"Morris Traversal — Postorder",                difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3FbgX0o", yt:"https://youtu.be/sWf7k1x9XR4", patternTags:["Tree", "DFS"] },
      ]},
      { id: "13.2", title: "Medium Problems", problems: [
        { id:481, name:"Height of a Binary Tree",                     difficulty:"Easy",   lc:"https://leetcode.com/problems/maximum-depth-of-binary-tree/", gfg:"https://bit.ly/3T2hVOu", yt:"https://youtu.be/eD3tmO66aBA", patternTags:["Tree", "DFS"] },
        { id:482, name:"Check if Binary Tree is Height-Balanced",     difficulty:"Medium", lc:"https://leetcode.com/problems/balanced-binary-tree/", gfg:"https://bit.ly/3rDA8VJ", yt:"https://youtu.be/Yt50Jfbd8Po", patternTags:["Tree", "DFS"] },
        { id:483, name:"Diameter of Binary Tree",                     difficulty:"Medium", lc:"https://leetcode.com/problems/diameter-of-binary-tree/", gfg:"https://bit.ly/3SZaJZx", yt:"https://youtu.be/Rezetez59Nk", patternTags:["Tree", "DFS"] },
        { id:484, name:"Maximum Path Sum",                            difficulty:"Hard",   lc:"https://leetcode.com/problems/binary-tree-maximum-path-sum/", gfg:"https://bit.ly/3T2iD5O", yt:"https://youtu.be/WszrfSwMz58", patternTags:["Tree", "DFS"] },
        { id:485, name:"Check if Two Trees are Identical",            difficulty:"Easy",   lc:"https://leetcode.com/problems/same-tree/", gfg:"https://bit.ly/3rDAW2c", yt:"https://youtu.be/BhuvF_-PWS0", patternTags:["Tree", "DFS"] },
        { id:486, name:"Zig Zag Traversal of Binary Tree",            difficulty:"Medium", lc:"https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/", gfg:"https://bit.ly/3FcK1AS", yt:"https://youtu.be/JJgwbMtFji0", patternTags:["Tree", "BFS"] },
        { id:487, name:"Boundary Traversal of Binary Tree",           difficulty:"Medium", lc:null, gfg:"https://bit.ly/3T2jVCo", yt:"https://youtu.be/0ca1nvR0be4", patternTags:["Tree", "DFS"] },
        { id:488, name:"Vertical Order Traversal of Binary Tree",     difficulty:"Hard",   lc:"https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/", gfg:"https://bit.ly/3rDBdNK", yt:"https://youtu.be/HE2lpJSp2KE", patternTags:["Tree", "BFS"] },
        { id:489, name:"Top View of Binary Tree",                     difficulty:"Medium", lc:null, gfg:"https://bit.ly/3T2k3eW", yt:"https://youtu.be/KSsk8AhdLZw", patternTags:["Tree", "BFS"] },
        { id:490, name:"Bottom View of Binary Tree",                  difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FcL9Ar", yt:"https://youtu.be/KSsk8AhdLZw", patternTags:["Tree", "BFS"] },
        { id:491, name:"Right/Left View of Binary Tree",              difficulty:"Easy",   lc:"https://leetcode.com/problems/binary-tree-right-side-view/", gfg:"https://bit.ly/3rDBPfA", yt:"https://youtu.be/KKL_GU2bP_M", patternTags:["Tree", "DFS", "BFS"] },
        { id:492, name:"Check for Symmetrical Binary Tree",           difficulty:"Medium", lc:"https://leetcode.com/problems/symmetric-tree/", gfg:"https://bit.ly/3T2lEho", yt:"https://youtu.be/9QvznsuoYUo", patternTags:["Tree", "DFS"] },
      ]},
      { id: "13.3", title: "Hard Problems", problems: [
        { id:493, name:"Root to Node Path in Binary Tree",            difficulty:"Medium", lc:null, gfg:"https://bit.ly/3SZbpBR", yt:"https://youtu.be/iWcbtuoUaUg", patternTags:["Tree", "DFS"] },
        { id:494, name:"LCA in Binary Tree",                          difficulty:"Medium", lc:"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", gfg:"https://bit.ly/3T2m9fA", yt:"https://youtu.be/_-QHfMDde90", patternTags:["Tree", "DFS"] },
        { id:495, name:"Maximum Width of Binary Tree",                difficulty:"Medium", lc:"https://leetcode.com/problems/maximum-width-of-binary-tree/", gfg:"https://bit.ly/3rDCSU2", yt:"https://youtu.be/4yzAYTSh4UA", patternTags:["Tree", "BFS"] },
        { id:496, name:"Children Sum Property in Binary Tree",        difficulty:"Medium", lc:null, gfg:"https://bit.ly/3T2nJxq", yt:"https://youtu.be/dKbhdSAprQ8", patternTags:["Tree", "DFS"] },
        { id:497, name:"Print All the Nodes at a Distance of K in Binary Tree", difficulty:"Hard", lc:"https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/", gfg:"https://bit.ly/3FcN1ZL", yt:"https://youtu.be/Vt5lvyqlBhY", patternTags:["Tree", "BFS", "DFS"] },
        { id:498, name:"Minimum Time Taken to BURN the Binary Tree",  difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3SZeJYz", yt:"https://youtu.be/_RVpaJgZ51Q", patternTags:["Tree", "BFS"] },
        { id:499, name:"Count Total Nodes in a Complete Binary Tree", difficulty:"Medium", lc:"https://leetcode.com/problems/count-complete-tree-nodes/", gfg:"https://bit.ly/3rDDEnQ", yt:"https://youtu.be/9NaR0BC2lJI", patternTags:["Tree", "Binary Search"] },
        { id:500, name:"Requirements Needed to Construct a Unique Binary Tree", difficulty:"Hard", lc:null, gfg:"https://bit.ly/3T2oMpJ", yt:"https://youtu.be/3eIBASGcGiQ", patternTags:["Tree"] },
        { id:501, name:"Construct Binary Tree from Preorder and Inorder", difficulty:"Hard", lc:"https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", gfg:"https://bit.ly/3FcOJxN", yt:"https://youtu.be/aZNaLrVebKQ", patternTags:["Tree", "DFS"] },
        { id:502, name:"Construct Binary Tree from Postorder and Inorder", difficulty:"Hard", lc:"https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/", gfg:"https://bit.ly/3rDEzGN", yt:"https://youtu.be/LgLRTaEMRVc", patternTags:["Tree", "DFS"] },
        { id:503, name:"Serialize and Deserialize a Binary Tree",     difficulty:"Hard",   lc:"https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", gfg:"https://bit.ly/3T2pXqV", yt:"https://youtu.be/u4JAi2JJhI8", patternTags:["Tree", "BFS"] },
        { id:504, name:"Morris Inorder Traversal",                    difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3FbgX0o", yt:"https://youtu.be/F5b7DnT-_-A", patternTags:["Tree", "DFS"] },
        { id:505, name:"Flatten Binary Tree to Linked List",          difficulty:"Hard",   lc:"https://leetcode.com/problems/flatten-binary-tree-to-linked-list/", gfg:"https://bit.ly/3rDFy0R", yt:"https://youtu.be/sWf7k1x9XR4", patternTags:["Tree", "DFS", "Linked List"] },
        { id:507, name:"Diagonal Traversal of Binary Tree",           difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3T2qXqR", yt:"https://youtu.be/W3WiH3SUMs8", patternTags:["Tree", "BFS"] },
      ]},
    ]
};

const TOPIC_BST = {
  stepId: "step14", stepTitle: "Step 14: Binary Search Trees [Concept and Problems]", color: "#34D399",
  subtopics: [
    { id: "14.1", title: "Concepts", problems: [
      { id:600, name:"Introduction to BST",                            difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/binary-search-tree-data-structure/", yt:"https://youtu.be/p7-9UvDQZ3w", patternTags:["BST","Tree"] },
      { id:601, name:"Search in a BST",                                difficulty:"Easy",   lc:"https://leetcode.com/problems/search-in-a-binary-search-tree/", gfg:"https://www.geeksforgeeks.org/binary-search-tree-set-1-search-and-insertion/", yt:"https://youtu.be/KcNt6v_56cc", patternTags:["BST","Tree"] },
      { id:602, name:"Find Min/Max in BST",                            difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/find-the-minimum-element-in-a-binary-search-tree/", yt:"https://youtu.be/p7-9UvDQZ3w", patternTags:["BST","Tree"] },
    ]},
    { id: "14.2", title: "Practice Problems", problems: [
      { id:603, name:"Ceil in a BST",                                  difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/problems/implementing-ceil-in-bst/1", yt:"https://youtu.be/KSsk8AhdLZw", patternTags:["BST","Tree"] },
      { id:604, name:"Floor in a BST",                                 difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/floor-in-binary-search-tree-bst/", yt:"https://youtu.be/xm_W1ub-K-w", patternTags:["BST","Tree"] },
      { id:605, name:"Insert into a BST",                              difficulty:"Medium", lc:"https://leetcode.com/problems/insert-into-a-binary-search-tree/", gfg:"https://www.geeksforgeeks.org/binary-search-tree-set-1-search-and-insertion/", yt:"https://youtu.be/FiFiNvM29ps", patternTags:["BST","Tree"] },
      { id:606, name:"Delete Node in a BST",                           difficulty:"Medium", lc:"https://leetcode.com/problems/delete-node-in-a-bst/", gfg:"https://www.geeksforgeeks.org/binary-search-tree-set-2-delete/", yt:"https://youtu.be/kouxiP_H5WE", patternTags:["BST","Tree"] },
      { id:607, name:"Kth Smallest Element in a BST",                  difficulty:"Medium", lc:"https://leetcode.com/problems/kth-smallest-element-in-a-bst/", gfg:"https://www.geeksforgeeks.org/find-k-th-smallest-element-in-bst-order-statistics-in-bst/", yt:"https://youtu.be/9TJYWh0adfk", patternTags:["BST","Tree","DFS"] },
      { id:608, name:"Kth Largest Element in a BST",                   difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/kth-largest-element-in-bst-when-modification-to-bst-is-not-allowed/", yt:"https://youtu.be/9TJYWh0adfk", patternTags:["BST","Tree","DFS"] },
      { id:609, name:"Validate Binary Search Tree",                    difficulty:"Medium", lc:"https://leetcode.com/problems/validate-binary-search-tree/", gfg:"https://www.geeksforgeeks.org/a-program-to-check-if-a-binary-tree-is-bst-or-not/", yt:"https://youtu.be/f-sj7I5oXEI", patternTags:["BST","Tree","DFS"] },
      { id:610, name:"LCA in BST",                                     difficulty:"Medium", lc:"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", gfg:"https://www.geeksforgeeks.org/lowest-common-ancestor-in-a-binary-search-tree/", yt:"https://youtu.be/cX_kPV_foZc", patternTags:["BST","Tree"] },
      { id:611, name:"Construct BST from Preorder Traversal",          difficulty:"Medium", lc:"https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/", gfg:"https://www.geeksforgeeks.org/construct-bst-from-given-preorder-traversal/", yt:"https://youtu.be/UmJT3j26t1I", patternTags:["BST","Tree"] },
      { id:612, name:"Inorder Successor and Predecessor in BST",                       difficulty:"Medium", lc:"https://leetcode.com/problems/inorder-successor-in-bst/", gfg:"https://www.geeksforgeeks.org/inorder-successor-in-binary-search-tree/", yt:"https://youtu.be/SXKAD2svfmI", patternTags:["BST","Tree"] },
      { id:6121, name:"Merge Two BSTs",                                difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/problems/merge-two-bst-s/1", yt:"https://youtu.be/s6ATEkipzow", patternTags:["BST","Tree","DFS"] },
      { id:613, name:"BST Iterator",                                   difficulty:"Medium", lc:"https://leetcode.com/problems/binary-search-tree-iterator/", gfg:"https://www.geeksforgeeks.org/implement-binary-search-treebst-iterator/", yt:"https://youtu.be/D2jMcmxU4bs", patternTags:["BST","Tree","Design"] },
      { id:614, name:"Two Sum in BST",                                 difficulty:"Easy",   lc:"https://leetcode.com/problems/two-sum-iv-input-is-a-bst/", gfg:"https://www.geeksforgeeks.org/find-a-pair-with-given-sum-in-bst/", yt:"https://youtu.be/ssL3sHwPeb4", patternTags:["BST","Tree","Two Pointer"] },
      { id:615, name:"Recover BST (Correct the BST)",                  difficulty:"Hard",   lc:"https://leetcode.com/problems/recover-binary-search-tree/", gfg:"https://www.geeksforgeeks.org/fix-two-swapped-nodes-of-bst/", yt:"https://youtu.be/ZWGW7FminDM", patternTags:["BST","Tree","DFS"] },
      { id:616, name:"Largest BST in Binary Tree",                     difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/find-the-largest-subtree-in-a-tree-that-is-also-a-bst/", yt:"https://youtu.be/X0oXMdtUDwo", patternTags:["BST","Tree","DP"] },
    ]},
  ]
};

const TOPIC_GRAPHS = {
  stepId: "step15", stepTitle: "Step 15: Graphs [Concepts & Problems]", color: "#F97316",
  subtopics: [
    { id: "15.1", title: "Learning", problems: [
      { id:620, name:"Graph and Types",                                difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/", yt:"https://youtu.be/M3_pLsDdeuU", patternTags:["Graph"] },
      { id:621, name:"Graph Representation — C++",                   difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/graph-and-its-representations/", yt:"https://youtu.be/3oI-34aPMWM", patternTags:["Graph"] },
      { id:6211, name:"Graph Representation — Java",                 difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/graph-and-its-representations/", yt:"https://youtu.be/3oI-34aPMWM", patternTags:["Graph"] },
      { id:622, name:"Connected Components",                          difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/connected-components-in-an-undirected-graph/", yt:"https://youtu.be/sV7bXpU5o9k", patternTags:["Graph","BFS","DFS"] },
      { id:623, name:"BFS (Breadth First Search)",                    difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/", yt:"https://youtu.be/-tgVpUgsQ5k", patternTags:["Graph","BFS"] },
      { id:624, name:"DFS (Depth First Search)",                      difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/", yt:"https://youtu.be/Qzf1a--rhp8", patternTags:["Graph","DFS"] },
    ]},
    { id: "15.2", title: "Problems on BFS/DFS", problems: [
      { id:625, name:"Number of Provinces",                           difficulty:"Medium", lc:"https://leetcode.com/problems/number-of-provinces/", gfg:"https://www.geeksforgeeks.org/find-the-number-of-provinces/", yt:"https://youtu.be/0btP7bWWp0E", patternTags:["Graph","DFS","Union Find"] },
      { id:626, name:"Number of Islands",                             difficulty:"Medium", lc:"https://leetcode.com/problems/number-of-islands/", gfg:"https://www.geeksforgeeks.org/find-the-number-of-islands/", yt:"https://youtu.be/sV7bXpU5o9k", patternTags:["Graph","BFS","DFS"] },
      { id:627, name:"Rotten Oranges",                                difficulty:"Medium", lc:"https://leetcode.com/problems/rotting-oranges/", gfg:"https://www.geeksforgeeks.org/minimum-time-required-so-that-all-oranges-become-rotten/", yt:"https://youtu.be/yf3oUhkvB8o", patternTags:["Graph","BFS"] },
      { id:628, name:"Flood Fill",                                    difficulty:"Easy",   lc:"https://leetcode.com/problems/flood-fill/", gfg:"https://www.geeksforgeeks.org/flood-fill-algorithm-implement-fill-paint/", yt:"https://youtu.be/C-2_uSRli8o", patternTags:["Graph","BFS","DFS"] },
      { id:629, name:"Cycle Detection in Undirected Graph (BFS)",     difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/detect-cycle-undirected-graph/", yt:"https://youtu.be/A8ko93TyOns", patternTags:["Graph","BFS"] },
      { id:630, name:"Cycle Detection in Undirected Graph (DFS)",     difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/detect-cycle-undirected-graph/", yt:"https://youtu.be/zQ3zgFypzX4", patternTags:["Graph","DFS"] },
      { id:631, name:"0/1 Matrix",                                    difficulty:"Medium", lc:"https://leetcode.com/problems/01-matrix/", gfg:"https://www.geeksforgeeks.org/shortest-distance-from-a-source-cell-to-all-other-cells-of-a-matrix/", yt:"https://youtu.be/edXdVlkYA-4", patternTags:["Graph","BFS"] },
      { id:632, name:"Surrounded Regions",                            difficulty:"Medium", lc:"https://leetcode.com/problems/surrounded-regions/", gfg:"https://www.geeksforgeeks.org/given-matrix-o-x-replace-o-x-surrounded-x/", yt:"https://youtu.be/BtdgAys4yMk", patternTags:["Graph","BFS","DFS"] },
      { id:633, name:"Number of Enclaves",                            difficulty:"Medium", lc:"https://leetcode.com/problems/number-of-enclaves/", gfg:"https://www.geeksforgeeks.org/count-cells-in-a-grid-from-which-entire-grid-cannot-be-visited/", yt:"https://youtu.be/rxKcepXQgU4", patternTags:["Graph","BFS","DFS"] },
      { id:634, name:"Word Ladder I",                                 difficulty:"Hard",   lc:"https://leetcode.com/problems/word-ladder/", gfg:"https://www.geeksforgeeks.org/word-ladder-length-of-shortest-chain-to-reach-a-target-word/", yt:"https://youtu.be/tRPda0rcf8E", patternTags:["Graph","BFS"] },
      { id:635, name:"Word Ladder II",                                difficulty:"Hard",   lc:"https://leetcode.com/problems/word-ladder-ii/", gfg:"https://www.geeksforgeeks.org/word-ladder-set-2complete-solution/", yt:"https://youtu.be/DREutrv2XD0", patternTags:["Graph","BFS"] },
      { id:636, name:"Number of Distinct Islands",                    difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/number-distinct-islands/", yt:"https://youtu.be/7zmgQSJghpo", patternTags:["Graph","DFS","Hashing"] },
      { id:637, name:"Bipartite Graph (BFS)",                         difficulty:"Medium", lc:"https://leetcode.com/problems/is-graph-bipartite/", gfg:"https://www.geeksforgeeks.org/bipartite-graph/", yt:"https://youtu.be/-vu34sct1g8", patternTags:["Graph","BFS"] },
      { id:638, name:"Bipartite Graph (DFS)",                         difficulty:"Medium", lc:"https://leetcode.com/problems/is-graph-bipartite/", gfg:"https://www.geeksforgeeks.org/bipartite-graph/", yt:"https://youtu.be/KG5YFfR0j8A", patternTags:["Graph","DFS"] },
    ]},
    { id: "15.3", title: "Topo Sort and Problems", problems: [
      { id:639, name:"Topological Sort (DFS)",                        difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/topological-sorting/", yt:"https://youtu.be/5lZ0iJMrUMk", patternTags:["Graph","DFS","Topological Sort"] },
      { id:640, name:"Topological Sort (BFS — Kahn's Algo)",         difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/topological-sorting-indegree-based-solution/", yt:"https://youtu.be/73sneFXuTEg", patternTags:["Graph","BFS","Topological Sort"] },
      { id:641, name:"Cycle Detection in Directed Graph (BFS)",       difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/detect-cycle-in-a-directed-graph-using-bfs/", yt:"https://youtu.be/iTBaI90lpDQ", patternTags:["Graph","BFS","Topological Sort"] },
      { id:642, name:"Cycle Detection in Directed Graph (DFS)",       difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/detect-cycle-in-a-graph/", yt:"https://youtu.be/9twcmtQj4DU", patternTags:["Graph","DFS"] },
      { id:643, name:"Course Schedule I",                             difficulty:"Medium", lc:"https://leetcode.com/problems/course-schedule/", gfg:"https://www.geeksforgeeks.org/find-whether-it-is-possible-to-finish-all-tasks-or-not-from-given-dependencies/", yt:"https://youtu.be/WAOfKpxYHR8", patternTags:["Graph","BFS","Topological Sort"] },
      { id:644, name:"Course Schedule II",                            difficulty:"Medium", lc:"https://leetcode.com/problems/course-schedule-ii/", gfg:"https://www.geeksforgeeks.org/find-the-ordering-of-tasks-from-given-dependencies/", yt:"https://youtu.be/qe_pQCh09yU", patternTags:["Graph","BFS","Topological Sort"] },
      { id:645, name:"Find Eventual Safe States",                     difficulty:"Medium", lc:"https://leetcode.com/problems/find-eventual-safe-states/", gfg:"https://www.geeksforgeeks.org/find-eventual-safe-states-in-a-directed-graph/", yt:"https://youtu.be/uRbJ1OF9aYM", patternTags:["Graph","DFS","Topological Sort"] },
      { id:646, name:"Alien Dictionary",                              difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/given-sorted-dictionary-find-precedence-characters/", yt:"https://youtu.be/U3N_je7tWAs", patternTags:["Graph","BFS","Topological Sort"] },
    ]},
    { id: "15.4", title: "Shortest Path Algorithms", problems: [
      { id:647, name:"Shortest Path in Undirected Graph (Unit Weights)", difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/shortest-path-unweighted-graph/", yt:"https://youtu.be/C4gxoTaI71U", patternTags:["Graph","BFS"] },
      { id:648, name:"Shortest Path in DAG",                          difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/shortest-path-for-directed-acyclic-graphs/", yt:"https://youtu.be/ZUFQfFaU-8U", patternTags:["Graph","Topological Sort"] },
      { id:649, name:"Dijkstra's Algorithm (Priority Queue)",         difficulty:"Medium", lc:"https://leetcode.com/problems/network-delay-time/", gfg:"https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/", yt:"https://youtu.be/V6H1qAeB-l4", patternTags:["Graph","Dijkstra","Heap"] },
      { id:650, name:"Dijkstra's Algorithm (Set)",                    difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-using-set-in-stl/", yt:"https://youtu.be/PATgNiyd2n0", patternTags:["Graph","Dijkstra"] },
      { id:651, name:"Bellman Ford Algorithm",                        difficulty:"Medium", lc:"https://leetcode.com/problems/network-delay-time/", gfg:"https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/", yt:"https://youtu.be/0vVofAhAYjc", patternTags:["Graph","Bellman Ford"] },
      { id:652, name:"Floyd Warshall Algorithm",                      difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/", yt:"https://youtu.be/YbY8cVwWAvw", patternTags:["Graph","Floyd Warshall"] },
      { id:653, name:"City With the Smallest Number of Neighbors",    difficulty:"Medium", lc:"https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/", gfg:"https://www.geeksforgeeks.org/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/", yt:"https://youtu.be/PwMVNSJ5SLI", patternTags:["Graph","Floyd Warshall"] },
      { id:654, name:"Path With Minimum Effort",                      difficulty:"Medium", lc:"https://leetcode.com/problems/path-with-minimum-effort/", gfg:"https://www.geeksforgeeks.org/path-with-minimum-effort/", yt:"https://youtu.be/0ytpZyiZFhA", patternTags:["Graph","Dijkstra","Binary Search"] },
      { id:655, name:"Cheapest Flights Within K Stops",               difficulty:"Medium", lc:"https://leetcode.com/problems/cheapest-flights-within-k-stops/", gfg:"https://www.geeksforgeeks.org/find-the-cheapest-flights-within-k-stops/", yt:"https://youtu.be/9XybHVqTHcQ", patternTags:["Graph","Bellman Ford","BFS"] },
      { id:656, name:"Minimum Multiplications to Reach End",          difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/minimum-multiplications-to-reach-end/", yt:"https://youtu.be/_BvEJ3VIDWw", patternTags:["Graph","BFS"] },
      { id:657, name:"Number of Ways to Arrive at Destination",       difficulty:"Medium", lc:"https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/", gfg:"https://www.geeksforgeeks.org/number-of-ways-to-arrive-at-destination/", yt:"https://youtu.be/_-0mx0SmYxA", patternTags:["Graph","Dijkstra"] },
    ]},
    { id: "15.5", title: "MST / Disjoint Set Union", problems: [
      { id:658, name:"Minimum Spanning Tree (Prim's Algorithm)",      difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/", yt:"https://youtu.be/mJcZjjKzeqk", patternTags:["Graph","MST","Heap"] },
      { id:659, name:"Disjoint Set (Union-Find)",                     difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/union-find/", yt:"https://youtu.be/aBxjDBC4M1U", patternTags:["Graph","Union Find"] },
      { id:660, name:"Kruskal's Algorithm",                           difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/", yt:"https://youtu.be/DMnDM_sxVig", patternTags:["Graph","MST","Union Find"] },
      { id:661, name:"Number of Operations to Make Network Connected",difficulty:"Medium", lc:"https://leetcode.com/problems/number-of-operations-to-make-network-connected/", gfg:"https://www.geeksforgeeks.org/minimize-the-number-of-weakly-connected-nodes/", yt:"https://youtu.be/FYrl7iz9_ZU", patternTags:["Graph","Union Find"] },
      { id:662, name:"Most Stones Removed with Same Row or Column",   difficulty:"Medium", lc:"https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/", gfg:"https://www.geeksforgeeks.org/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/1", yt:"https://youtu.be/OwMNX8SPavM", patternTags:["Graph","Union Find"] },
      { id:663, name:"Accounts Merge",                                difficulty:"Medium", lc:"https://leetcode.com/problems/accounts-merge/", gfg:"https://www.geeksforgeeks.org/accounts-merge/", yt:"https://youtu.be/FMwpt_aQOGw", patternTags:["Graph","Union Find"] },
      { id:664, name:"Number of Islands II",                          difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/problems/number-of-islands/1", yt:"https://youtu.be/Rn6B-Q4SNyA", patternTags:["Graph","Union Find"] },
      { id:665, name:"Making a Large Island",                         difficulty:"Hard",   lc:"https://leetcode.com/problems/making-a-large-island/", gfg:"https://www.geeksforgeeks.org/making-large-island/", yt:"https://youtu.be/lgiz9H56yfM", patternTags:["Graph","Union Find"] },
      { id:666, name:"Swim in Rising Water",                          difficulty:"Hard",   lc:"https://leetcode.com/problems/swim-in-rising-water/", gfg:"https://www.geeksforgeeks.org/swim-in-rising-water/", yt:"https://youtu.be/amvrKlMLuGY", patternTags:["Graph","Dijkstra","Union Find"] },
    ]},
    { id: "15.6", title: "Other Algorithms", problems: [
      { id:667, name:"Bridges in Graph (Tarjan's Algorithm)",         difficulty:"Hard",   lc:"https://leetcode.com/problems/critical-connections-in-a-network/", gfg:"https://www.geeksforgeeks.org/bridge-in-a-graph/", yt:"https://youtu.be/qrAub5z8FeA", patternTags:["Graph","DFS"] },
      { id:668, name:"Articulation Point",                            difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/articulation-points-or-cut-vertices-in-a-graph/", yt:"https://youtu.be/64KK9K4RpKE", patternTags:["Graph","DFS"] },
      { id:669, name:"Kosaraju's Algorithm (Strongly Connected Components)", difficulty:"Hard", lc:null, gfg:"https://www.geeksforgeeks.org/strongly-connected-components/", yt:"https://youtu.be/V8qIqJxCioo", patternTags:["Graph","DFS"] },
      { id:6691, name:"Tarjan's Algorithm (Strongly Connected Components)", difficulty:"Hard", lc:null, gfg:"https://www.geeksforgeeks.org/tarjan-algorithm-find-strongly-connected-components/", yt:"https://youtu.be/wUgWX0nc4NY", patternTags:["Graph","DFS"] },
    ]},
  ]
};

const TOPIC_DP = {
  stepId: "step16", stepTitle: "Step 16: Dynamic Programming [Patterns and Problems]", color: "#A78BFA",
  subtopics: [
    { id: "16.1", title: "Introduction to DP", problems: [
      { id:6801, name:"Introduction to Dynamic Programming",          difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/dynamic-programming/", yt:"https://youtu.be/tyB0ztf0DNY", patternTags:["DP"] },
      { id:680, name:"Climbing Stairs",                               difficulty:"Easy",   lc:"https://leetcode.com/problems/climbing-stairs/", gfg:"https://www.geeksforgeeks.org/count-ways-reach-nth-stair/", yt:"https://youtu.be/mLfjzJsN8us", patternTags:["DP"] },
      { id:681, name:"Frog Jump (DP 1D)",                             difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/minimum-cost-to-reach-destination-in-a-maze/", yt:"https://youtu.be/EgG3jsGoPvQ", patternTags:["DP"] },
      { id:682, name:"Frog Jump with K Distances",                    difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/minimum-jumps-to-reach-home/", yt:"https://youtu.be/Kmh3rhyEtB8", patternTags:["DP"] },
      { id:683, name:"Maximum Sum of Non-Adjacent Elements",          difficulty:"Medium", lc:"https://leetcode.com/problems/house-robber/", gfg:"https://www.geeksforgeeks.org/maximum-sum-such-that-no-two-elements-are-adjacent/", yt:"https://youtu.be/GrMBfJNk_NY", patternTags:["DP"] },
      { id:684, name:"House Robber II",                               difficulty:"Medium", lc:"https://leetcode.com/problems/house-robber-ii/", gfg:"https://www.geeksforgeeks.org/house-robber-ii/", yt:"https://youtu.be/3WaxQMELSkw", patternTags:["DP"] },
    ]},
    { id: "16.2", title: "2D / 3D DP and DP on Grids", problems: [
      { id:685, name:"Ninja's Training",                              difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/ninja-training/", yt:"https://youtu.be/AE39gJYuRog", patternTags:["DP"] },
      { id:686, name:"Grid Unique Paths",                             difficulty:"Medium", lc:"https://leetcode.com/problems/unique-paths/", gfg:"https://www.geeksforgeeks.org/count-possible-paths-top-left-bottom-right-nxm-matrix/", yt:"https://youtu.be/sdE0A2Oxofw", patternTags:["DP","Matrix"] },
      { id:687, name:"Grid Unique Paths II",                          difficulty:"Medium", lc:"https://leetcode.com/problems/unique-paths-ii/", gfg:"https://www.geeksforgeeks.org/unique-paths-in-a-grid-with-obstacles/", yt:"https://youtu.be/TmhpgXScLyY", patternTags:["DP","Matrix"] },
      { id:688, name:"Minimum Path Sum in Grid",                      difficulty:"Medium", lc:"https://leetcode.com/problems/minimum-path-sum/", gfg:"https://www.geeksforgeeks.org/minimum-path-sum/", yt:"https://youtu.be/_rgPMd5EZmk", patternTags:["DP","Matrix"] },
      { id:689, name:"Minimum Path Sum in Triangular Grid",           difficulty:"Medium", lc:"https://leetcode.com/problems/triangle/", gfg:"https://www.geeksforgeeks.org/minimum-sum-path-triangle/", yt:"https://youtu.be/SrP-PiLSYC0", patternTags:["DP"] },
      { id:690, name:"Minimum/Maximum Falling Path Sum",              difficulty:"Medium", lc:"https://leetcode.com/problems/minimum-falling-path-sum/", gfg:"https://www.geeksforgeeks.org/minimum-falling-path-sum/", yt:"https://youtu.be/N_aJ5pQNxWc", patternTags:["DP","Matrix"] },
      { id:691, name:"3D DP — Chocolate Pickup",                     difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/maximize-the-total-profit-of-all-the-persons/", yt:"https://youtu.be/vYSte-AB1_0", patternTags:["DP"] },
    ]},
    { id: "16.3", title: "DP on Subsequences", problems: [
      { id:692, name:"Subset Sum Equal to Target",                    difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/subset-sum-problem-dp-25/", yt:"https://youtu.be/fWX9xDmIzRI", patternTags:["DP","Subset"] },
      { id:693, name:"Partition Equal Subset Sum",                    difficulty:"Medium", lc:"https://leetcode.com/problems/partition-equal-subset-sum/", gfg:"https://www.geeksforgeeks.org/problems/subset-sum-problem2014/1", yt:"https://youtu.be/7win3dcgo3k", patternTags:["DP","Subset"] },
      { id:694, name:"Partition Set Into 2 Subsets With Min Abs Sum Diff", difficulty:"Hard", lc:null, gfg:"https://www.geeksforgeeks.org/partition-a-set-into-two-subsets-such-that-the-difference-of-subset-sums-is-minimum/", yt:"https://youtu.be/GS_OqZb2Ckc", patternTags:["DP","Subset"] },
      { id:695, name:"Count Subsets with Sum K",                      difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/count-of-subsets-with-sum-equal-to-x/", yt:"https://youtu.be/ZHyb-A2Mte4", patternTags:["DP","Subset"] },
      { id:6951, name:"Count Partitions with Given Difference",        difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/problems/partitions-with-given-difference/1", yt:"https://youtu.be/zoilQD1kYSg", patternTags:["DP","Subset"] },
      { id:696, name:"0/1 Knapsack",                                  difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/", yt:"https://youtu.be/GqOmJHQZivw", patternTags:["DP","Knapsack"] },
      { id:697, name:"Coin Change (Minimum Coins)",                   difficulty:"Medium", lc:"https://leetcode.com/problems/coin-change/", gfg:"https://www.geeksforgeeks.org/find-minimum-number-of-coins-that-make-a-change/", yt:"https://youtu.be/myPeWb3X9Gg", patternTags:["DP","Knapsack"] },
      { id:6971, name:"Target Sum",                                    difficulty:"Medium", lc:"https://leetcode.com/problems/target-sum/", gfg:"https://www.geeksforgeeks.org/problems/target-sum-1626326450/1", yt:"https://youtu.be/w5MhgmmUGio", patternTags:["DP","Knapsack"] },
      { id:698, name:"Coin Change II (Number of Ways)",               difficulty:"Medium", lc:"https://leetcode.com/problems/coin-change-ii/", gfg:"https://www.geeksforgeeks.org/coin-change-dp-7/", yt:"https://youtu.be/HgyouUi11zk", patternTags:["DP","Knapsack"] },
      { id:699, name:"Unbounded Knapsack",                            difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/unbounded-knapsack-repetition-items-allowed/", yt:"https://youtu.be/OgvOZ6OrJoY", patternTags:["DP","Knapsack"] },
      { id:700, name:"Rod Cutting Problem",                           difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/cutting-a-rod-dp-13/", yt:"https://youtu.be/mO8XpGoJwuo", patternTags:["DP","Knapsack"] },
    ]},
    { id: "16.4", title: "DP on Strings", problems: [
      { id:701, name:"Longest Common Subsequence",                    difficulty:"Medium", lc:"https://leetcode.com/problems/longest-common-subsequence/", gfg:"https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/", yt:"https://youtu.be/sSno9rV8Rhg", patternTags:["DP","Strings"] },
      { id:702, name:"Print Longest Common Subsequence",              difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/printing-longest-common-subsequence/", yt:"https://youtu.be/-zI4mrF2Gu4", patternTags:["DP","Strings"] },
      { id:703, name:"Longest Common Substring",                      difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/longest-common-substring-dp-29/", yt:"https://youtu.be/_wP9mVysobI", patternTags:["DP","Strings"] },
      { id:704, name:"Longest Palindromic Subsequence",               difficulty:"Medium", lc:"https://leetcode.com/problems/longest-palindromic-subsequence/", gfg:"https://www.geeksforgeeks.org/longest-palindromic-subsequence-dp-12/", yt:"https://youtu.be/6i_T5kkfv4A", patternTags:["DP","Strings"] },
      { id:705, name:"Minimum Insertions to Make String Palindrome",  difficulty:"Hard",   lc:"https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/", gfg:"https://www.geeksforgeeks.org/minimum-insertions-to-form-a-palindrome-dp-28/", yt:"https://youtu.be/xPBLEj41rFU", patternTags:["DP","Strings"] },
      { id:706, name:"Minimum Insertions/Deletions to Convert String",difficulty:"Medium", lc:"https://leetcode.com/problems/delete-operation-for-two-strings/", gfg:"https://www.geeksforgeeks.org/minimum-number-deletions-insertions-transform-one-string-another/", yt:"https://youtu.be/yMnH0jrir0Q", patternTags:["DP","Strings"] },
      { id:707, name:"Shortest Common Supersequence",                 difficulty:"Hard",   lc:"https://leetcode.com/problems/shortest-common-supersequence/", gfg:"https://www.geeksforgeeks.org/shortest-common-supersequence/", yt:"https://youtu.be/xElxAuBcvsU", patternTags:["DP","Strings"] },
      { id:708, name:"Edit Distance",                                 difficulty:"Hard",   lc:"https://leetcode.com/problems/edit-distance/", gfg:"https://www.geeksforgeeks.org/edit-distance-dp-5/", yt:"https://youtu.be/FgnJs_zUOiU", patternTags:["DP","Strings"] },
      { id:709, name:"Wildcard Matching",                             difficulty:"Hard",   lc:"https://leetcode.com/problems/wildcard-matching/", gfg:"https://www.geeksforgeeks.org/wildcard-pattern-matching/", yt:"https://youtu.be/ZmlQ3vgAOMo", patternTags:["DP","Strings"] },
    ]},
    { id: "16.5", title: "DP on Stocks", problems: [
      { id:710, name:"Best Time to Buy and Sell Stock",               difficulty:"Easy",   lc:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", gfg:"https://www.geeksforgeeks.org/best-time-to-buy-and-sell-stock/", yt:"https://youtu.be/ioFPBdChabY", patternTags:["DP","Stocks","Greedy"] },
      { id:711, name:"Buy and Sell Stock II",                         difficulty:"Medium", lc:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/", gfg:"https://www.geeksforgeeks.org/stock-buy-sell/", yt:"https://youtu.be/nGJmxkUJQGs", patternTags:["DP","Stocks","Greedy"] },
      { id:712, name:"Buy and Sell Stock III",                        difficulty:"Hard",   lc:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/", gfg:"https://www.geeksforgeeks.org/maximum-profit-by-buying-and-selling-a-share-at-most-twice/", yt:"https://youtu.be/wuzTpONbd-8", patternTags:["DP","Stocks"] },
      { id:713, name:"Buy and Sell Stock IV",                         difficulty:"Hard",   lc:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/", gfg:"https://www.geeksforgeeks.org/maximum-profit-by-buying-and-selling-a-share-at-most-k-times/", yt:"https://youtu.be/IV1dHbk5Zm4", patternTags:["DP","Stocks"] },
      { id:714, name:"Buy and Sell Stocks With Cooldown",             difficulty:"Medium", lc:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/", gfg:"https://www.geeksforgeeks.org/stock-buy-sell-with-cooldown/", yt:"https://youtu.be/4Kh29-HfE3M", patternTags:["DP","Stocks"] },
      { id:715, name:"Buy and Sell Stocks With Transaction Fee",      difficulty:"Medium", lc:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/", gfg:"https://www.geeksforgeeks.org/maximum-profit-from-stock-with-transaction-fee/", yt:"https://youtu.be/Q1oBBp7t0_M", patternTags:["DP","Stocks","Greedy"] },
    ]},
    { id: "16.6", title: "DP on LIS", problems: [
      { id:716, name:"Longest Increasing Subsequence",                difficulty:"Medium", lc:"https://leetcode.com/problems/longest-increasing-subsequence/", gfg:"https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/", yt:"https://youtu.be/ekcwMsSIzVc", patternTags:["DP","LIS"] },
      { id:717, name:"Print Longest Increasing Subsequence",          difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/construction-of-longest-monotonically-increasing-subsequence-n-log-n/", yt:"https://youtu.be/IFfYfonAFGc", patternTags:["DP","LIS"] },
      { id:718, name:"LIS using Binary Search O(n log n)",            difficulty:"Medium", lc:"https://leetcode.com/problems/longest-increasing-subsequence/", gfg:"https://www.geeksforgeeks.org/longest-monotonically-increasing-subsequence-size-n-log-n/", yt:"https://youtu.be/on2hvxBXJH4", patternTags:["DP","LIS","Binary Search"] },
      { id:719, name:"Largest Divisible Subset",                      difficulty:"Medium", lc:"https://leetcode.com/problems/largest-divisible-subset/", gfg:"https://www.geeksforgeeks.org/largest-divisible-subset/", yt:"https://youtu.be/gDuZwBW9VvM", patternTags:["DP","LIS"] },
      { id:720, name:"Longest String Chain",                          difficulty:"Medium", lc:"https://leetcode.com/problems/longest-string-chain/", gfg:"https://www.geeksforgeeks.org/longest-string-chain/", yt:"https://youtu.be/YY8iBaYcc4g", patternTags:["DP","LIS"] },
      { id:721, name:"Longest Bitonic Subsequence",                   difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/longest-bitonic-subsequence-dp-15/", yt:"https://youtu.be/y4vN0WNdrlg", patternTags:["DP","LIS"] },
      { id:722, name:"Number of Longest Increasing Subsequences",     difficulty:"Medium", lc:"https://leetcode.com/problems/number-of-longest-increasing-subsequence/", gfg:"https://www.geeksforgeeks.org/number-of-longest-increasing-subsequences/", yt:"https://youtu.be/cKVl1TFdNXg", patternTags:["DP","LIS"] },
    ]},
    { id: "16.7", title: "MCM DP | Partition DP", problems: [
      { id:723, name:"Matrix Chain Multiplication",                   difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/", yt:"https://youtu.be/vRVfmbCFW7Y", patternTags:["DP","MCM"] },
      { id:7231, name:"Matrix Chain Multiplication — Bottom Up",      difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/", yt:"https://youtu.be/pDCXsbAeQz0", patternTags:["DP","MCM"] },
      { id:724, name:"Minimum Cost to Cut the Stick",                 difficulty:"Hard",   lc:"https://leetcode.com/problems/minimum-cost-to-cut-a-stick/", gfg:"https://www.geeksforgeeks.org/minimum-cost-to-cut-a-stick/", yt:"https://youtu.be/xwomavsC86c", patternTags:["DP","MCM"] },
      { id:725, name:"Burst Balloons",                                difficulty:"Hard",   lc:"https://leetcode.com/problems/burst-balloons/", gfg:"https://www.geeksforgeeks.org/burst-balloon-to-maximize-coins/", yt:"https://youtu.be/Yz4LlDSlkns", patternTags:["DP","MCM"] },
      { id:726, name:"Evaluate Boolean Expression to True",           difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/boolean-parenthesization-problem-dp-37/", yt:"https://youtu.be/MM7fXopgyjw", patternTags:["DP","MCM"] },
      { id:727, name:"Palindrome Partitioning II",                    difficulty:"Hard",   lc:"https://leetcode.com/problems/palindrome-partitioning-ii/", gfg:"https://www.geeksforgeeks.org/palindrome-partitioning-dp-17/", yt:"https://youtu.be/_H8V5hJUGd0", patternTags:["DP","MCM"] },
      { id:728, name:"Partition Array for Maximum Sum",               difficulty:"Medium", lc:"https://leetcode.com/problems/partition-array-for-maximum-sum/", gfg:"https://www.geeksforgeeks.org/partition-array-maximum-sum/", yt:"https://youtu.be/PhWWJmaKfMc", patternTags:["DP","MCM"] },
    ]},
    { id: "16.8", title: "DP on Squares", problems: [
      { id:729, name:"Maximum Rectangle Area with All 1's",           difficulty:"Hard",   lc:"https://leetcode.com/problems/maximal-rectangle/", gfg:"https://www.geeksforgeeks.org/maximum-size-rectangle-binary-sub-matrix-1s/", yt:"https://youtu.be/tOkVAjFHBH0", patternTags:["DP","Stack","Matrix"] },
      { id:730, name:"Count Square Submatrices with All Ones",        difficulty:"Medium", lc:"https://leetcode.com/problems/count-square-submatrices-with-all-ones/", gfg:"https://www.geeksforgeeks.org/count-of-squares-with-all-sides-1/", yt:"https://youtu.be/auS1fynpnjo", patternTags:["DP","Matrix"] },
    ]},
  ]
};

const TOPIC_TRIES = {
  stepId: "step17", stepTitle: "Step 17: Tries", color: "#F43F5E",
  subtopics: [
    { id: "17.1", title: "Theory", problems: [
      { id:740, name:"Implement Trie I (Insert, Search, StartsWith)", difficulty:"Medium", lc:"https://leetcode.com/problems/implement-trie-prefix-tree/", gfg:"https://www.geeksforgeeks.org/trie-insert-and-search/", yt:"https://youtu.be/dBGUmUQhjaM", patternTags:["Trie"] },
      { id:741, name:"Implement Trie II (Count Prefix, Complete Word)",difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/implement-a-trie-data-structure/", yt:"https://youtu.be/K5pcpkEMCN0", patternTags:["Trie"] },
    ]},
    { id: "17.2", title: "Problems", problems: [
      { id:742, name:"Longest String with All Prefixes",              difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/longest-string-where-each-character-can-be-found-in-previous-prefixes/", yt:"https://youtu.be/AWnBa91lThI", patternTags:["Trie"] },
      { id:743, name:"Number of Distinct Substrings in a String",     difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/count-distinct-substrings-of-a-string-using-suffix-trie/", yt:"https://youtu.be/RV0QETsfOf0", patternTags:["Trie"] },
      { id:7431, name:"Bit Prerequisites for TRIE Problems",          difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/trie-memory-optimization-using-hash-map/", yt:"https://youtu.be/vLet1lysSmg", patternTags:["Trie","Bit Manipulation"] },
      { id:744, name:"Maximum XOR of Two Numbers in an Array",        difficulty:"Medium", lc:"https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/", gfg:"https://www.geeksforgeeks.org/maximum-xor-of-two-numbers-in-an-array/", yt:"https://youtu.be/jCu-Pd0T48k", patternTags:["Trie","Bit Manipulation"] },
      { id:745, name:"Maximum XOR With an Element From Array",        difficulty:"Hard",   lc:"https://leetcode.com/problems/maximum-xor-with-an-element-from-array/", gfg:"https://www.geeksforgeeks.org/maximum-xor-with-an-element-from-array/", yt:"https://youtu.be/Q8LhG9Pi5KM", patternTags:["Trie","Bit Manipulation"] },
    ]},
  ]
};

const TOPIC_STRINGS_ADV = {
  stepId: "step18", stepTitle: "Step 18: Strings", color: "#EC4899",
  subtopics: [
    { id: "18.1", title: "Hard Problems", problems: [
      { id:7501, name:"Min Bracket Reversals to Balance Expression",  difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/minimum-number-of-bracket-reversals-needed-to-make-an-expression-balanced/", yt:"https://youtu.be/bNzmLrOQEyE", patternTags:["Strings","Stack"] },
      { id:7502, name:"Count and Say",                                difficulty:"Medium", lc:"https://leetcode.com/problems/count-and-say/", gfg:"https://www.geeksforgeeks.org/look-and-say-sequence/", yt:"https://youtu.be/F7Y6xyL3Bkk", patternTags:["Strings"] },
      { id:756, name:"String Hashing",                                difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/string-hashing-using-polynomial-rolling-hash-function/", yt:"https://youtu.be/WaqFggB8B30", patternTags:["Strings","Hashing"] },
      { id:753, name:"Rabin Karp Algorithm",                          difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/", yt:"https://youtu.be/qQ8vS2btsxI", patternTags:["Strings","Hashing"] },
      { id:752, name:"Z-Function",                                    difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/z-algorithm-linear-time-pattern-searching-algorithm/", yt:"https://youtu.be/CpZh4eF8QBw", patternTags:["Strings","Z-Algorithm"] },
      { id:751, name:"KMP Algorithm / LPS (Longest Prefix Suffix)",   difficulty:"Hard",   lc:"https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/", gfg:"https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/", yt:"https://youtu.be/V5-7GzOfADQ", patternTags:["Strings","KMP"] },
      { id:755, name:"Shortest Palindrome",                           difficulty:"Hard",   lc:"https://leetcode.com/problems/shortest-palindrome/", gfg:"https://www.geeksforgeeks.org/minimum-characters-to-be-added-at-front-to-make-string-palindrome/", yt:"https://youtu.be/c-dMIKa3yTQ", patternTags:["Strings","KMP"] },
      { id:758, name:"Longest Substring with At Least K Repeating Characters", difficulty:"Medium", lc:"https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/", gfg:"https://www.geeksforgeeks.org/longest-substring-with-at-least-k-repeating-characters/", yt:"https://youtu.be/5e_w68zUe7o", patternTags:["Strings","Sliding Window","Divide and Conquer"] },
      { id:757, name:"Suffix Array",                                  difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/suffix-array-set-1-introduction/", yt:"https://youtu.be/uxA__b23t2w", patternTags:["Strings"] },
    ]},
  ]
};

const ALL_TOPICS = [
  TOPIC_SORTING, TOPIC_ARRAYS, TOPIC_BINARY_SEARCH,
  TOPIC_STRINGS, TOPIC_LINKED_LIST, TOPIC_RECURSION, TOPIC_BIT_MANIPULATION, TOPIC_STACK_QUEUES,
  TOPIC_SLIDING_WINDOW, TOPIC_HEAPS, TOPIC_GREEDY, TOPIC_BINARY_TREES,
  TOPIC_BST, TOPIC_GRAPHS, TOPIC_DP, TOPIC_TRIES, TOPIC_STRINGS_ADV,
];

const SHEET = ALL_TOPICS;

const ALL_PROBLEMS = SHEET.flatMap(step =>
  step.subtopics.flatMap(sub =>
    sub.problems.map(p => ({ ...p, stepId: step.stepId, stepTitle: step.stepTitle, stepColor: step.color, subtopicId: sub.id, subtopicTitle: sub.title }))
  )
);

const MOTIVATION_BG_IMAGE = "data:image/jpeg;base64,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";

// ════════════════════════════════════════════════════════════════════════════
// MOTIVATIONAL QUOTES
// ════════════════════════════════════════════════════════════════════════════
const QUOTES = [
  { text: "Success in DSA isn't solving 10 problems in one day. It's solving 1 problem every day for 100 days.", author: "A2Z Revision Hub" },
  { text: "Every problem you struggle with today becomes an interview question you won't fear tomorrow.", author: "A2Z Revision Hub" },
  { text: "Consistency beats motivation. Show up even when you don't feel like coding.", author: "A2Z Revision Hub" },
  { text: "The difference between a beginner and an expert is thousands of mistakes they refused to quit on.", author: "A2Z Revision Hub" },
  { text: "One solved problem may not change your future, but a habit of solving problems will.", author: "A2Z Revision Hub" },
  { text: "Don't compare your chapter 1 to someone else's chapter 20. Focus on your own journey.", author: "A2Z Revision Hub" },
  { text: "The hardest problem often teaches the most valuable lesson.", author: "A2Z Revision Hub" },
  { text: "A placement offer is earned long before interview day. It is built through daily practice.", author: "A2Z Revision Hub" },
  { text: "Progress is not measured by speed. It is measured by persistence.", author: "A2Z Revision Hub" },
  { text: "Every time you revisit a topic, you are strengthening the foundation of your future career.", author: "A2Z Revision Hub" },
  { text: "Great programmers are not born. They are built one bug, one concept, and one problem at a time.", author: "A2Z Revision Hub" },
  { text: "The version of you that cracks placements is created by the choices you make today.", author: "A2Z Revision Hub" },
  { text: "Mastering DSA is not about intelligence. It is about patience, repetition, and discipline.", author: "A2Z Revision Hub" },
  { text: "Small daily improvements eventually create extraordinary results.", author: "A2Z Revision Hub" },
  { text: "Keep solving. Keep learning. Keep improving. Your future self will thank you.", author: "A2Z Revision Hub" },
];

const getDailyQuote = () => {
  const today = new Date();
  const dayIndex = Math.floor(today.getTime() / 86400000) % QUOTES.length;
  return QUOTES[dayIndex];
};

// ════════════════════════════════════════════════════════════════════════════
// STORAGE HELPERS
// ════════════════════════════════════════════════════════════════════════════
const LS = "dsa_v1";
const load = () => { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch { return {}; } };
const save = (d) => { try { localStorage.setItem(LS, JSON.stringify(d)); } catch {} };

const ACTIVITY_LS = "dsa_activity_v1";
const loadActivity = () => { try { return JSON.parse(localStorage.getItem(ACTIVITY_LS)) || {}; } catch { return {}; } };
const saveActivity = (d) => { try { localStorage.setItem(ACTIVITY_LS, JSON.stringify(d)); } catch {} };

const PRACTICE_LS = "dsa_practice_v1";
const loadPractice = () => { try { return JSON.parse(localStorage.getItem(PRACTICE_LS)) || null; } catch { return null; } };
const savePractice = (d) => { try { localStorage.setItem(PRACTICE_LS, JSON.stringify(d)); } catch {} };

const SETTINGS_LS = "dsa_settings_v1";
const DEFAULT_SETTINGS = { dailyGoal: 3 };
const loadSettings = () => { try { return { ...DEFAULT_SETTINGS, ...(JSON.parse(localStorage.getItem(SETTINGS_LS)) || {}) }; } catch { return { ...DEFAULT_SETTINGS }; } };
const saveSettings = (d) => { try { localStorage.setItem(SETTINGS_LS, JSON.stringify(d)); } catch {} };

const PROFILE_LS = "dsa_profile_v1";
const DEFAULT_PROFILE = { name: "Sumit Singh Thakur", goal: "Crack FAANG", github: "sumit25mim10015-byte", linkedin: "sumit-singh-thakur", gfg: "sumitth8nc9", leetcode: "sumit799", codeforces: "", avatarColor: "#7C3AED" };
const loadProfile = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(PROFILE_LS)) || {};
    const merged = { ...DEFAULT_PROFILE };
    // Only let a stored value override the default if it's actually non-empty.
    // This prevents stale blank strings (saved before defaults existed) from
    // permanently masking newly-added default values.
    Object.keys(stored).forEach(k => {
      if (stored[k] !== "" && stored[k] !== null && stored[k] !== undefined) {
        merged[k] = stored[k];
      }
    });
    return merged;
  } catch {
    return { ...DEFAULT_PROFILE };
  }
};
const saveProfile = (d) => { try { localStorage.setItem(PROFILE_LS, JSON.stringify(d)); } catch {} };

const todayKey = () => new Date().toISOString().slice(0, 10);

const bumpActivity = (activity, dateKey = todayKey(), by = 1) => {
  const next = { ...activity, [dateKey]: (activity[dateKey] || 0) + by };
  saveActivity(next);
  return next;
};

// ════════════════════════════════════════════════════════════════════════════
// HEATMAP
// ════════════════════════════════════════════════════════════════════════════
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const buildHeatmap = (activity) => {
  const today = new Date();
  const dow = today.getDay();
  const start = new Date(today);
  start.setDate(today.getDate() - dow - 25 * 7);
  const weeks = [];
  for (let w = 0; w < 26; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const dt = new Date(start);
      dt.setDate(start.getDate() + w * 7 + d);
      const isFuture = dt > today;
      const dateStr = dt.toISOString().slice(0, 10);
      const count = isFuture ? 0 : (activity[dateStr] || 0);
      week.push({ date: dateStr, count, isFuture });
    }
    weeks.push(week);
  }
  return weeks;
};

const getMonthLabels = (heatmap) => {
  const out = []; let last = -1;
  heatmap.forEach((wk, wi) => {
    const m = new Date(wk[0].date).getMonth();
    if (m !== last) { out.push({ wi, m }); last = m; }
  });
  return out;
};

const heatCol = (c, f) => f ? "transparent" : ["#161B22","#0E4429","#006D32","#26A641","#39D353"][c === 0 ? 0 : c <= 2 ? 1 : c <= 4 ? 2 : c <= 7 ? 3 : 4];

// ════════════════════════════════════════════════════════════════════════════
// REVISION ENGINE
// ════════════════════════════════════════════════════════════════════════════
const REVISION_OFFSETS = [3, 10, 30];

const addDays = (dateStr, days) => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

const buildRevisionHistory = (solvedDate) => REVISION_OFFSETS.map((days, i) => ({
  stage: i + 1,
  dueDate: addDays(solvedDate, days),
  done: false,
}));

const daysAgo = (dateStr) => {
  if (!dateStr) return null;
  return Math.floor((Date.now() - new Date(dateStr)) / 86400000);
};
const daysAgoLabel = (dateStr) => {
  const diff = daysAgo(dateStr);
  if (diff === null) return "Never";
  if (diff <= 0) return "Today";
  if (diff === 1) return "1 day ago";
  return `${diff} days ago`;
};
const daysAgoColor = (dateStr) => {
  const diff = daysAgo(dateStr);
  if (diff === null) return "#484F58";
  if (diff <= 7) return "#3FB950";
  if (diff <= 30) return "#E3B341";
  return "#F85149";
};

const DANGER_THRESHOLD = 60;
const getDangerZone = (progress) => {
  return ALL_PROBLEMS
    .map(p => {
      const pr = progress[p.id];
      if (!pr || !["Solved","Revised"].includes(pr.status)) return null;
      const hasCompletedRevision = (pr.revisionHistory || []).some(r => r.done);
      const lastRevisedDays = daysAgo(pr.lastRevised);
      const lastSolvedDays  = daysAgo(pr.lastSolved);
      let daysSince = null;
      if (pr.lastRevised && lastRevisedDays > DANGER_THRESHOLD) daysSince = lastRevisedDays;
      else if (!hasCompletedRevision && pr.lastSolved && lastSolvedDays > DANGER_THRESHOLD) daysSince = lastSolvedDays;
      if (daysSince === null) return null;
      return { ...p, daysSince };
    })
    .filter(Boolean)
    .sort((a, b) => b.daysSince - a.daysSince);
};

const STATUS_SOURCES = ["Solved","Revised","Attempted","Not Started"];

const generatePracticeSet = (progress, { topic, difficulties, sources, count }) => {
  let pool = ALL_PROBLEMS.filter(p => {
    if (topic && topic !== "Any" && p.stepTitle !== topic) return false;
    if (difficulties && difficulties.length && !difficulties.includes("Any") && !difficulties.includes(p.difficulty)) return false;
    const st = progress[p.id]?.status || "Not Started";
    if (sources && sources.length && !sources.includes(st)) return false;
    return true;
  });
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
};

const isValidUrl = (url) => typeof url === "string" && /^https?:\/\//.test(url.trim());

// ════════════════════════════════════════════════════════════════════════════
// STREAK + RECORDS
// ════════════════════════════════════════════════════════════════════════════
const computeStreak = (activity) => {
  const hasToday = (activity[todayKey()] || 0) > 0;
  let cursor = new Date();
  if (!hasToday) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if ((activity[key] || 0) > 0) { streak++; cursor.setDate(cursor.getDate() - 1); }
    else break;
  }
  return streak;
};

const computePersonalRecords = (activity) => {
  const entries = Object.entries(activity).filter(([, count]) => count > 0);
  let bestDay = null, bestCount = 0;
  entries.forEach(([date, count]) => { if (count > bestCount) { bestCount = count; bestDay = date; } });
  const activeDates = entries.map(([date]) => date).sort();
  let longestStreak = 0, currentRun = 0, prevDate = null;
  activeDates.forEach(date => {
    if (prevDate) {
      const diffDays = Math.round((new Date(date) - new Date(prevDate)) / 86400000);
      currentRun = diffDays === 1 ? currentRun + 1 : 1;
    } else { currentRun = 1; }
    if (currentRun > longestStreak) longestStreak = currentRun;
    prevDate = date;
  });
  return { bestDay, bestCount, longestStreak };
};

const computeSummary = (progress, activity, days) => {
  const today = new Date();
  const cutoff = new Date(today);
  cutoff.setDate(cutoff.getDate() - (days - 1));
  const cutoffKey = cutoff.toISOString().slice(0, 10);
  let totalActivity = 0;
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    totalActivity += activity[d.toISOString().slice(0, 10)] || 0;
  }
  const solvedInWindow = [];
  const revisedInWindow = [];
  Object.entries(progress).forEach(([id, pr]) => {
    if (pr.lastSolved && pr.lastSolved >= cutoffKey) {
      const problem = ALL_PROBLEMS.find(p => p.id === Number(id));
      if (problem) solvedInWindow.push(problem);
    }
    (pr.revisionHistory || []).forEach(r => {
      if (r.done && r.doneDate && r.doneDate >= cutoffKey) {
        const problem = ALL_PROBLEMS.find(p => p.id === Number(id));
        if (problem) revisedInWindow.push(problem);
      }
    });
  });
  const byDifficulty = { Easy: 0, Medium: 0, Hard: 0 };
  solvedInWindow.forEach(p => { byDifficulty[p.difficulty] = (byDifficulty[p.difficulty] || 0) + 1; });
  const byTopic = {};
  solvedInWindow.forEach(p => { byTopic[p.stepTitle] = (byTopic[p.stepTitle] || 0) + 1; });
  let focusTopic = null, focusCount = 0;
  Object.entries(byTopic).forEach(([t, c]) => { if (c > focusCount) { focusTopic = t; focusCount = c; } });
  return { days, totalActivity, solvedCount: solvedInWindow.length, revisedCount: revisedInWindow.length, byDifficulty, focusTopic, focusCount, dailyAvg: Math.round((totalActivity / days) * 10) / 10 };
};

const exportProgress = (progress, activity) => {
  const payload = { exportedAt: new Date().toISOString(), version: 1, progress, activity };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `dsa-tracker-backup-${todayKey()}.json`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// ════════════════════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════════════════════
const DC = d => ({ Easy:"#3FB950", Medium:"#E3B341", Hard:"#F85149" }[d] || "#8B949E");
const DB = d => ({ Easy:"rgba(63,185,80,.12)", Medium:"rgba(227,179,65,.12)", Hard:"rgba(248,81,73,.12)" }[d] || "rgba(139,148,158,.12)");
const SC = s => ({ Solved:"#3FB950", Revised:"#A78BFA", Attempted:"#E3B341", "Not Started":"#484F58" }[s] || "#484F58");
const SB = s => ({ Solved:"rgba(63,185,80,.12)", Revised:"rgba(167,139,250,.12)", Attempted:"rgba(227,179,65,.12)", "Not Started":"rgba(72,79,88,.12)" }[s] || "rgba(72,79,88,.12)");

// ════════════════════════════════════════════════════════════════════════════
// MILESTONE SYSTEM
// ════════════════════════════════════════════════════════════════════════════
const MILESTONES = [
  { id: "bronze",   label: "Bronze",   threshold: 50,   color: "#CD7F32", emoji: "🥉", glow: "rgba(205,127,50,0.4)" },
  { id: "silver",   label: "Silver",   threshold: 100,  color: "#C0C0C0", emoji: "🥈", glow: "rgba(192,192,192,0.4)" },
  { id: "gold",     label: "Gold",     threshold: 250,  color: "#FFD700", emoji: "🥇", glow: "rgba(255,215,0,0.4)" },
  { id: "diamond",  label: "Diamond",  threshold: 500,  color: "#B9F2FF", emoji: "💎", glow: "rgba(185,242,255,0.4)" },
  { id: "legend",   label: "Legend",   threshold: 1000, color: "#A78BFA", emoji: "👑", glow: "rgba(167,139,250,0.4)" },
];

const getMilestoneData = (solved) => {
  const current = [...MILESTONES].reverse().find(m => solved >= m.threshold) || null;
  const next = MILESTONES.find(m => solved < m.threshold) || null;
  const prevThreshold = current ? current.threshold : 0;
  const nextThreshold = next ? next.threshold : MILESTONES[MILESTONES.length - 1].threshold;
  const pct = next ? Math.min(100, Math.round(((solved - prevThreshold) / (nextThreshold - prevThreshold)) * 100)) : 100;
  return { current, next, pct, prevThreshold, nextThreshold };
};

// ════════════════════════════════════════════════════════════════════════════
// ANIMATED COUNT-UP HOOK
// ════════════════════════════════════════════════════════════════════════════
function useCountUp(target, duration = 1200, trigger = true) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = null;
    const from = 0;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(from + (target - from) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, trigger]);
  return val;
}

// ════════════════════════════════════════════════════════════════════════════
// SHARED FRAMER MOTION VARIANTS
// Kept fast (200-400ms) and restrained — no bounce/spin, just fade+slide.
// ════════════════════════════════════════════════════════════════════════════
const fadeSlideUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
};

// Stagger container — children fire 60ms apart, capped so long lists don't
// take forever to finish entering.
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.03 } },
};

const modalBackdropVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.18, ease: "easeIn" } },
};

const modalPanelVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.28, ease: [0.34, 1.2, 0.64, 1] } },
  exit: { opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.18, ease: "easeIn" } },
};

// Page/section switch — quick fade + tiny slide, never more than ~250ms
const pageTransitionVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15, ease: "easeIn" } },
};

// Card hover — translateY(-4px) + soft glow, per spec
const cardHoverTransition = { duration: 0.22, ease: [0.22, 1, 0.36, 1] };

function ProgressBar({ value, max, color, height = 4, animate = false }) {
  const [pct, setPct] = useState(animate ? 0 : Math.min((value / Math.max(max, 1)) * 100, 100));
  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setPct(Math.min((value / Math.max(max, 1)) * 100, 100)), 100);
    return () => clearTimeout(t);
  }, [value, max, animate]);
  const realPct = animate ? pct : Math.min((value / Math.max(max, 1)) * 100, 100);
  return (
    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 9999, overflow: "hidden", height }}>
      <div style={{ width: `${realPct}%`, height: "100%", background: color, borderRadius: 9999, transition: animate ? "width 1.2s cubic-bezier(0.22,1,0.36,1)" : "width .6s ease", boxShadow: `0 0 6px ${color}66` }} />
    </div>
  );
}

function DiffBadge({ d }) {
  return <span style={{ color: DC(d), background: DB(d), padding: "2px 7px", borderRadius: 5, fontSize: 11, fontWeight: 600, lineHeight: 1.6, display: "inline-block" }}>{d}</span>;
}

function StatusBadge({ s }) {
  return <span style={{ color: SC(s), background: SB(s), padding: "2px 7px", borderRadius: 5, fontSize: 11, fontWeight: 600, lineHeight: 1.6, display: "inline-flex", alignItems: "center", gap: 3, whiteSpace: "nowrap" }}>{s === "Solved" ? "✓ " : s === "Revised" ? "✦ " : ""}{s}</span>;
}

function LinkPills({ p }) {
  const pills = [
    { key: "lc", label: "LC", color: "#E3B341", url: p.lc },
    { key: "gfg", label: "GFG", color: "#2EC866", url: p.gfg },
    { key: "yt", label: "YT", color: "#F85149", url: p.yt },
  ].filter(x => isValidUrl(x.url));
  if (!pills.length) return <span style={{ color: "#484F58", fontSize: 12 }}>—</span>;
  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
      {pills.map(({ key, label, color, url }) => (
        <a key={key} href={url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
          style={{ color, border: `1px solid ${color}33`, background: `${color}12`, padding: "2px 6px", borderRadius: 4, fontSize: 11, fontWeight: 700, textDecoration: "none", lineHeight: 1.6 }}>
          {label}
        </a>
      ))}
    </div>
  );
}

function NotesIndicator({ progress, problemId }) {
  if (!progress[problemId]?.notes?.trim()) return null;
  return <span title="Has notes" style={{ fontSize: 12, flexShrink: 0 }}>📝</span>;
}

function PatternTags({ tags }) {
  if (!tags || !tags.length) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {tags.map(t => (
        <span key={t} style={{ color: "#58A6FF", background: "rgba(88,166,255,.12)", border: "1px solid rgba(88,166,255,.25)", padding: "2px 8px", borderRadius: 99, fontSize: 11, fontWeight: 600 }}>{t}</span>
      ))}
    </div>
  );
}

function Card({ children, style }) {
  return (
    <motion.div
      variants={fadeSlideUp}
      whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(0,0,0,0.4), 0 0 0 1px rgba(167,139,250,0.08)" }}
      transition={cardHoverTransition}
      style={{
        background: "#0D1117", border: "1px solid #21262D", borderRadius: 12, padding: 20,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ children }) {
  return <div style={{ fontSize: 11, fontWeight: 600, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{children}</div>;
}

// ════════════════════════════════════════════════════════════════════════════
// SOCIAL PLATFORM ICONS (official-style SVG marks) + CONFIG
// ════════════════════════════════════════════════════════════════════════════
function SocialIcon({ platform, size = 18, color = "currentColor" }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: color, xmlns: "http://www.w3.org/2000/svg" };
  switch (platform) {
    case "github":
      return (
        <svg {...common}>
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.262.82-.58 0-.287-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.332-1.756-1.332-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.238 1.838 1.238 1.07 1.835 2.808 1.305 3.49.997.108-.776.41-1.305.745-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.47-2.382 1.235-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.008-.323 3.302 1.23A11.5 11.5 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.292-1.552 3.298-1.23 3.298-1.23.654 1.653.243 2.873.12 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.805 5.624-5.476 5.92.43.37.814 1.103.814 2.222 0 1.606-.015 2.9-.015 3.293 0 .32.216.697.825.58C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M20.45 20.45h-3.554v-5.569c0-1.328-.025-3.036-1.852-3.036-1.853 0-2.136 1.445-2.136 2.94v5.665H9.354V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.284zM5.337 7.433a2.07 2.07 0 11.005-4.139 2.07 2.07 0 01-.005 4.139zM7.114 20.45H3.558V9h3.556v11.45zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "leetcode":
      return (
        <svg {...common}>
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382H10.617z" />
        </svg>
      );
    case "gfg":
      return (
        <svg {...common}>
          <path d="M12.974 1.04a.967.967 0 0 0-.973.973v.001a.967.967 0 0 0 .973.972.967.967 0 0 0 .973-.972V2.01a.967.967 0 0 0-.973-.973zM11.026 1.04a.967.967 0 0 0-.973.973v.001a.967.967 0 0 0 .973.972.967.967 0 0 0 .973-.972V2.01a.967.967 0 0 0-.973-.973zM12 4.07c-5.236 0-9.474 1.96-9.474 4.39v10.43c0 2.43 4.238 4.39 9.474 4.39s9.474-1.96 9.474-4.39V8.46c0-2.43-4.238-4.39-9.474-4.39zm0 1.5c4.41 0 7.974 1.49 7.974 2.89s-3.564 2.89-7.974 2.89S4.026 9.86 4.026 8.46 7.59 5.57 12 5.57zm-7.974 5.49c1.49 1.04 4.51 1.78 7.974 1.78s6.484-.74 7.974-1.78v3.05c0 1.4-3.564 2.89-7.974 2.89S4.026 14.41 4.026 13.01v-3.05zm0 5.07c1.49 1.04 4.51 1.78 7.974 1.78s6.484-.74 7.974-1.78v3.3c0 1.4-3.564 2.89-7.974 2.89S4.026 19.93 4.026 18.53v-3.3z" />
        </svg>
      );
    case "codeforces":
      return (
        <svg {...common}>
          <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-6C14.328 1.5 15 2.172 15 3v16.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V3c0-.828.672-1.5 1.5-1.5h3zm9 9c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
        </svg>
      );
    default:
      return null;
  }
}

const SOCIAL_PLATFORMS = [
  { key: "github", label: "GitHub", color: "#9CA3AF", glow: "rgba(156,163,175,0.35)" },
  { key: "linkedin", label: "LinkedIn", color: "#0A66C2", glow: "rgba(10,102,194,0.4)" },
  { key: "leetcode", label: "LeetCode", color: "#FFA116", glow: "rgba(255,161,22,0.4)" },
  { key: "gfg", label: "GeeksforGeeks", color: "#2EC866", glow: "rgba(46,200,102,0.4)" },
  { key: "codeforces", label: "Codeforces", color: "#A78BFA", glow: "rgba(167,139,250,0.4)" },
];

function SocialCard({ platform, username, url, editing, onChangeUsername }) {
  const [hover, setHover] = useState(false);
  const cfg = SOCIAL_PLATFORMS.find(p => p.key === platform);
  const hasValue = !!(username && username.trim());

  const cardStyle = {
    display: "flex", alignItems: "center", gap: 12,
    padding: "11px 13px", borderRadius: 10,
    border: `1px solid ${hover && hasValue ? cfg.color + "70" : "#21262D"}`,
    background: hover && hasValue ? `${cfg.color}10` : "#0D1117",
    transition: "all 0.2s ease",
    transform: hover && hasValue ? "translateY(-2px)" : "translateY(0)",
    boxShadow: hover && hasValue ? `0 6px 18px ${cfg.glow}` : "none",
    cursor: hasValue && !editing ? "pointer" : "default",
    position: "relative",
    textDecoration: "none",
  };

  const inner = (
    <>
      <div style={{
        width: 34, height: 34, borderRadius: 9, flexShrink: 0,
        background: `${cfg.color}16`, border: `1px solid ${cfg.color}35`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: cfg.color,
      }}>
        <SocialIcon platform={platform} size={17} color={cfg.color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#E6EDF3" }}>{cfg.label}</div>
        {editing ? (
          <input
            value={username || ""}
            onChange={e => onChangeUsername(e.target.value)}
            placeholder="username"
            onClick={e => e.stopPropagation()}
            style={{ marginTop: 3, width: "100%", background: "#161B22", border: "1px solid #30363D", borderRadius: 6, color: "#C9D1D9", fontSize: 11.5, padding: "4px 8px", outline: "none" }}
          />
        ) : (
          <div style={{ fontSize: 11.5, color: hasValue ? "#8B949E" : "#484F58", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {hasValue ? username : "Not Added"}
          </div>
        )}
      </div>
      {hasValue && !editing && (
        <span style={{ fontSize: 11, color: cfg.color, opacity: hover ? 1 : 0, transition: "opacity 0.2s ease", flexShrink: 0 }}>↗</span>
      )}
    </>
  );

  if (editing || !hasValue) {
    return <div style={cardStyle}>{inner}</div>;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={url}
      style={cardStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {inner}
    </a>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PROFILE MODAL
// ════════════════════════════════════════════════════════════════════════════
function ProfileModal({ isOpen, onClose, progress, activity, profile, onSaveProfile }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);

  useEffect(() => { setForm(profile); }, [profile]);

  const solved = ALL_PROBLEMS.filter(p => ["Solved", "Revised"].includes(progress[p.id]?.status)).length;
  const totalRevisions = Object.values(progress).reduce((acc, pr) => acc + (pr.revisionHistory || []).filter(r => r.done).length, 0);
  const streak = computeStreak(activity);
  const records = computePersonalRecords(activity);
  const milestone = getMilestoneData(solved);
  const total = ALL_PROBLEMS.length;

  const AVATAR_COLORS = ["#7C3AED","#06B6D4","#10B981","#F59E0B","#EC4899","#8B5CF6","#22D3EE","#FB923C"];

  const socialLinks = [
    { key: "github", prefix: "https://github.com/" },
    { key: "linkedin", prefix: "https://www.linkedin.com/in/" },
    { key: "leetcode", prefix: "https://leetcode.com/u/" },
    { key: "gfg", prefix: "https://www.geeksforgeeks.org/profile/" },
    { key: "codeforces", prefix: "https://codeforces.com/profile/" },
  ];

  const handleSave = () => { onSaveProfile(form); setEditing(false); };

  const initials = form.name ? form.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) : "?";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalBackdropVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.7)",
            padding: 16,
          }} onClick={onClose}>
          <motion.div
            variants={modalPanelVariants}
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto",
              background: "#0D1117", border: "1px solid #30363D", borderRadius: 16,
              boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
            }}>
        {/* Header */}
        <div style={{ padding: "20px 20px 0", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#E6EDF3" }}>Profile</div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid #30363D", borderRadius: 8, color: "#8B949E", cursor: "pointer", padding: "4px 10px", fontSize: 13, lineHeight: 1.5 }}>✕</button>
        </div>

        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Avatar + name */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative" }}>
              <div style={{
                width: 68, height: 68, borderRadius: "50%",
                background: `linear-gradient(135deg, ${form.avatarColor}, ${form.avatarColor}88)`,
                border: `2px solid ${form.avatarColor}60`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, fontWeight: 700, color: "#fff",
                boxShadow: `0 0 20px ${form.avatarColor}40`,
                flexShrink: 0,
              }}>
                {initials}
              </div>
              {editing && (
                <div style={{ position: "absolute", bottom: -4, right: -4, display: "flex", gap: 3, flexWrap: "wrap", width: 80 }}>
                  {AVATAR_COLORS.map(c => (
                    <button key={c} onClick={() => setForm(f => ({ ...f, avatarColor: c }))}
                      style={{ width: 14, height: 14, borderRadius: "50%", background: c, border: c === form.avatarColor ? "2px solid #fff" : "2px solid transparent", cursor: "pointer", padding: 0 }} />
                  ))}
                </div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              {editing ? (
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={{ background: "#161B22", border: "1px solid #30363D", borderRadius: 8, color: "#E6EDF3", fontSize: 16, fontWeight: 700, padding: "6px 10px", width: "100%", outline: "none" }} />
              ) : (
                <div style={{ fontSize: 18, fontWeight: 700, color: "#E6EDF3" }}>{form.name || "Unnamed Coder"}</div>
              )}
              {editing ? (
                <input value={form.goal} onChange={e => setForm(f => ({ ...f, goal: e.target.value }))}
                  placeholder="Your current goal…"
                  style={{ background: "#161B22", border: "1px solid #30363D", borderRadius: 8, color: "#8B949E", fontSize: 12, padding: "4px 10px", width: "100%", outline: "none", marginTop: 6 }} />
              ) : (
                <div style={{ fontSize: 12, color: "#8B949E", marginTop: 3 }}>🎯 {form.goal || "Set your goal"}</div>
              )}
            </div>
            <button onClick={() => editing ? handleSave() : setEditing(true)}
              style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: `1px solid ${editing ? "#3FB95040" : "#A78BFA40"}`, background: editing ? "rgba(63,185,80,.12)" : "rgba(167,139,250,.12)", color: editing ? "#3FB950" : "#A78BFA", whiteSpace: "nowrap", flexShrink: 0 }}>
              {editing ? "Save" : "Edit"}
            </button>
          </div>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "Problems Solved", value: solved, color: "#3FB950", icon: "✓" },
              { label: "Revisions Done", value: totalRevisions, color: "#A78BFA", icon: "✦" },
              { label: "Current Streak", value: `${streak}d`, color: "#F59E0B", icon: "🔥" },
              { label: "Best Streak", value: `${records.longestStreak}d`, color: "#22D3EE", icon: "⚡" },
            ].map(stat => (
              <div key={stat.label} style={{ padding: "12px 14px", background: "#161B22", borderRadius: 10, border: "1px solid #21262D" }}>
                <div style={{ fontSize: 10, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>{stat.icon} {stat.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: stat.color, fontFamily: "monospace" }}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Milestones */}
          <div style={{ background: "#161B22", borderRadius: 10, border: "1px solid #21262D", padding: 14 }}>
            <div style={{ fontSize: 11, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 }}>Milestones</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
              {MILESTONES.map((m, i) => {
                const unlocked = solved >= m.threshold;
                const isCurrent = unlocked && milestone.current?.id === m.id;
                return (
                  <motion.div key={m.id} title={`${m.label}: ${m.threshold} problems`}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={isCurrent
                      ? { opacity: 1, scale: 1, boxShadow: [`0 0 4px ${m.glow}`, `0 0 16px ${m.glow}`, `0 0 4px ${m.glow}`] }
                      : { opacity: 1, scale: 1, boxShadow: "0 0 0px rgba(0,0,0,0)" }
                    }
                    transition={isCurrent
                      ? { opacity: { duration: 0.25, delay: i * 0.05 }, scale: { duration: 0.25, delay: i * 0.05 }, boxShadow: { duration: 2.2, repeat: Infinity, ease: "easeInOut" } }
                      : { duration: 0.25, delay: i * 0.05 }
                    }
                    style={{
                      padding: "6px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700,
                      border: `1px solid ${unlocked ? m.color + "60" : "#21262D"}`,
                      background: unlocked ? `${m.color}12` : "#0D1117",
                      color: unlocked ? m.color : "#484F58",
                      display: "flex", alignItems: "center", gap: 5,
                    }}>
                    <span style={{ fontSize: 14 }}>{m.emoji}</span>
                    {m.label}
                    {unlocked && <span style={{ opacity: 0.7 }}>✓</span>}
                  </motion.div>
                );
              })}
            </div>
            {milestone.next && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: "#8B949E" }}>
                    Next: <span style={{ color: milestone.next.color, fontWeight: 600 }}>{milestone.next.emoji} {milestone.next.label}</span>
                  </span>
                  <span style={{ color: "#8B949E", fontFamily: "monospace" }}>{solved} / {milestone.next.threshold}</span>
                </div>
                <ProgressBar value={solved - (milestone.current?.threshold || 0)} max={milestone.next.threshold - (milestone.current?.threshold || 0)} color={milestone.next.color} height={6} animate />
                <div style={{ fontSize: 11, color: "#484F58", marginTop: 4 }}>{milestone.next.threshold - solved} more to unlock {milestone.next.label}</div>
              </div>
            )}
            {!milestone.next && (
              <div style={{ textAlign: "center", color: "#A78BFA", fontSize: 13, fontWeight: 600 }}>👑 All milestones unlocked! You're a Legend!</div>
            )}
          </div>

          {/* Connect — Social Links */}
          <div style={{ background: "#161B22", borderRadius: 10, border: "1px solid #21262D", padding: 14 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.07em" }}>Connect</div>
              {!editing && (
                <span style={{ fontSize: 10, color: "#484F58" }}>Click a card to visit profile</span>
              )}
            </div>
            <div className="social-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {socialLinks.map(({ key, prefix }) => (
                <SocialCard
                  key={key}
                  platform={key}
                  username={form[key]}
                  url={form[key] ? `${prefix}${form[key]}` : null}
                  editing={editing}
                  onChangeUsername={(val) => setForm(f => ({ ...f, [key]: val }))}
                />
              ))}
            </div>
          </div>

          {/* Progress toward total */}
          <div style={{ background: "#161B22", borderRadius: 10, border: "1px solid #21262D", padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: "#8B949E" }}>Sheet Progress</span>
              <span style={{ fontSize: 12, fontFamily: "monospace", color: "#A78BFA" }}>{solved} / {total} ({Math.round((solved / total) * 100)}%)</span>
            </div>
            <ProgressBar value={solved} max={total} color="#A78BFA" height={6} animate />
          </div>
        </div>
      </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// MOTIVATION CARD
// ════════════════════════════════════════════════════════════════════════════
function MotivationCard({ style }) {
  const quote = useMemo(() => getDailyQuote(), []);
  const [visible, setVisible] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [quoteKey, setQuoteKey] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 200);
    // Gentle continuous zoom — slow, barely perceptible, loops via CSS below
    const t2 = setTimeout(() => setZoomed(true), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Smooth fade transition whenever the quote changes (i.e. a new calendar day)
  useEffect(() => { setQuoteKey(k => k + 1); }, [quote.text]);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div
      style={{
        borderRadius: 12, overflow: "hidden", border: "1px solid #21262D",
        position: "relative", display: "flex", flexDirection: "column",
        minHeight: 280, background: "#0D1117",
        transition: "transform 0.25s ease, box-shadow 0.3s ease",
        isolation: "isolate",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 10px 36px rgba(167,139,250,0.18), 0 8px 28px rgba(0,0,0,0.45)" : "none",
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image section — top half, no text overlaid */}
      <div style={{ position: "relative", flex: "1 1 55%", minHeight: 0, overflow: "hidden" }}>
        <img
          src={MOTIVATION_BG_IMAGE}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "50% 22%",
            transform: zoomed ? "scale(1.06)" : "scale(1)",
            transition: "transform 16s cubic-bezier(0.4,0,0.2,1)",
            willChange: "transform",
          }}
        />
        {/* Dark gradient overlay — exact spec: 0.85 / 0.45 / 0.10, bottom to top,
            fades the image into the card background below it */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(13,17,23,0.85), rgba(13,17,23,0.45), rgba(13,17,23,0.10))",
        }} />
      </div>

      {/* Quote section — below the image */}
      <div
        key={quoteKey}
        style={{
          position: "relative", padding: "22px 28px 28px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
          display: "flex", flexDirection: "column", gap: 14,
        }}
      >
        {/* Quote mark */}
        <div style={{ fontSize: 44, lineHeight: 0.5, color: "#A78BFA", opacity: 0.8, fontFamily: "Georgia, serif", userSelect: "none", marginTop: -8 }}>"</div>

        {/* Quote text */}
        <blockquote style={{
          fontSize: 22, fontWeight: 700, color: "#E6EDF3", lineHeight: 1.55,
          letterSpacing: "-0.02em", margin: 0, fontStyle: "normal",
        }}>
          {quote.text}
        </blockquote>

        {/* Author + date row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 2, background: "linear-gradient(90deg, #A78BFA, #7C3AED)", borderRadius: 1 }} />
            <span style={{ fontSize: 12, color: "#8B949E", fontWeight: 600 }}>{quote.author}</span>
          </div>
          <span style={{ fontSize: 11, color: "#484F58", fontFamily: "monospace" }}>{today}</span>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// RADIAL RING
// ════════════════════════════════════════════════════════════════════════════
function RadialRing({ pct, size = 140, stroke = 10, color = "#A78BFA", animate = false }) {
  const [displayPct, setDisplayPct] = useState(animate ? 0 : pct);
  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setDisplayPct(pct), 150);
    return () => clearTimeout(t);
  }, [pct, animate]);

  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (displayPct / 100) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: "stroke-dasharray 1.4s cubic-bezier(0.22,1,0.36,1)" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 24, fontWeight: 700, color, fontFamily: "monospace" }}>{displayPct}%</span>
        <span style={{ fontSize: 10, color: "#8B949E", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>done</span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// DANGER ZONE CARD
// ════════════════════════════════════════════════════════════════════════════
function DangerZoneCard({ progress, onSelectProblem }) {
  const danger = useMemo(() => getDangerZone(progress), [progress]);
  if (danger.length === 0) return null;
  return (
    <Card style={{ border: "1px solid #F8514940", background: "rgba(248,81,73,.05)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#F85149", textTransform: "uppercase", letterSpacing: "0.08em" }}>🚨 Danger Zone</div>
        <span style={{ fontSize: 11, fontFamily: "monospace", background: "rgba(248,81,73,.15)", color: "#F85149", padding: "2px 8px", borderRadius: 99 }}>
          {danger.length} Problem{danger.length === 1 ? "" : "s"} Need Attention
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {danger.slice(0, 8).map(p => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "#161B22", borderRadius: 8, border: "1px solid #F8514926" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, color: "#C9D1D9", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
              <div style={{ fontSize: 11, color: "#8B949E", marginTop: 2 }}>{p.subtopicTitle}</div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#F85149", fontFamily: "monospace", whiteSpace: "nowrap" }}>{p.daysSince} days ago</span>
            <button onClick={() => onSelectProblem(p)}
              style={{ padding: "6px 12px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer", border: "1px solid #F8514950", background: "rgba(248,81,73,.12)", color: "#F85149", whiteSpace: "nowrap", flexShrink: 0 }}>
              Review Now
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PERSONAL RECORDS CARD
// ════════════════════════════════════════════════════════════════════════════
function PersonalRecordsCard({ activity }) {
  const records = useMemo(() => computePersonalRecords(activity), [activity]);
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };
  return (
    <Card>
      <SectionTitle>Personal Records</SectionTitle>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 200px", display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: "#161B22", borderRadius: 10, border: "1px solid #21262D" }}>
          <div style={{ fontSize: 28, flexShrink: 0 }}>🏆</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 11, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Most Solved in a Day</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#E3B341", fontFamily: "monospace", lineHeight: 1.2 }}>{records.bestCount} {records.bestCount === 1 ? "problem" : "problems"}</div>
            <div style={{ fontSize: 12, color: "#8B949E", marginTop: 2 }}>{records.bestDay ? `on ${formatDate(records.bestDay)}` : "No activity yet"}</div>
          </div>
        </div>
        <div style={{ flex: "1 1 200px", display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: "#161B22", borderRadius: 10, border: "1px solid #21262D" }}>
          <div style={{ fontSize: 28, flexShrink: 0 }}>🔥</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 11, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Longest Streak</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#F59E0B", fontFamily: "monospace", lineHeight: 1.2 }}>{records.longestStreak} {records.longestStreak === 1 ? "day" : "days"}</div>
            <div style={{ fontSize: 12, color: "#8B949E", marginTop: 2 }}>{records.longestStreak > 0 ? "Consecutive days with activity" : "Start your streak today"}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// SUMMARY CARD
// ════════════════════════════════════════════════════════════════════════════
function SummaryCard({ progress, activity }) {
  const [range, setRange] = useState("week");
  const days = range === "week" ? 7 : 30;
  const summary = useMemo(() => computeSummary(progress, activity, days), [progress, activity, days]);
  const tabBtn = (key, label) => (
    <button onClick={() => setRange(key)}
      style={{ padding: "5px 12px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer", border: `1px solid ${range === key ? "#A78BFA60" : "#21262D"}`, background: range === key ? "rgba(167,139,250,.12)" : "#161B22", color: range === key ? "#A78BFA" : "#8B949E" }}>
      {label}
    </button>
  );
  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <SectionTitle>{range === "week" ? "Weekly Summary" : "Monthly Summary"}</SectionTitle>
        <div style={{ display: "flex", gap: 6 }}>{tabBtn("week", "7 Days")}{tabBtn("month", "30 Days")}</div>
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
        {[
          { label: "Solved", val: summary.solvedCount, color: "#3FB950" },
          { label: "Revised", val: summary.revisedCount, color: "#A78BFA" },
          { label: "Active Solves", val: summary.totalActivity, color: "#F59E0B" },
          { label: "Avg / Day", val: summary.dailyAvg, color: "#58A6FF" },
        ].map(x => (
          <div key={x.label} style={{ flex: "1 1 100px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: x.color, fontFamily: "monospace" }}>{x.val}</div>
            <div style={{ fontSize: 11, color: "#8B949E", marginTop: 2 }}>{x.label}</div>
          </div>
        ))}
      </div>
      {summary.solvedCount > 0 && (
        <div style={{ marginBottom: summary.focusTopic ? 12 : 0 }}>
          <div style={{ fontSize: 12, color: "#8B949E", marginBottom: 6 }}>New solves by difficulty</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Easy", "Medium", "Hard"].map(d => summary.byDifficulty[d] > 0 && (
              <span key={d} style={{ color: DC(d), background: DB(d), padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600 }}>{d}: {summary.byDifficulty[d]}</span>
            ))}
          </div>
        </div>
      )}
      {summary.focusTopic && (
        <div style={{ fontSize: 12, color: "#8B949E" }}>
          Focus area: <span style={{ color: "#E6EDF3", fontWeight: 600 }}>{summary.focusTopic.replace(/^Step \d+:\s*/, "")}</span>
          {" "}<span style={{ fontFamily: "monospace", color: "#A78BFA" }}>({summary.focusCount} solved)</span>
        </div>
      )}
      {summary.solvedCount === 0 && summary.revisedCount === 0 && (
        <p style={{ fontSize: 13, color: "#484F58", textAlign: "center", padding: "8px 0", margin: 0 }}>No activity in the last {days} days yet — get solving! 💪</p>
      )}
    </Card>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// HEATMAP
// ════════════════════════════════════════════════════════════════════════════
function GithubHeatmap({ activity }) {
  const [tip, setTip] = useState(null);
  const cellSize = 16, gap = 3;
  const heatmap = useMemo(() => buildHeatmap(activity), [activity]);
  const monthLabels = useMemo(() => getMonthLabels(heatmap), [heatmap]);
  return (
    <div style={{ overflowX: "auto", position: "relative" }}>
      <div style={{ display: "flex", paddingLeft: 28, marginBottom: 4 }}>
        {heatmap.map((wk, wi) => {
          const label = monthLabels.find(l => l.wi === wi);
          return <div key={wi} style={{ flexShrink: 0, width: cellSize + gap, fontSize: 11, color: "#8B949E", fontWeight: 500 }}>{label ? MONTHS[label.m] : ""}</div>;
        })}
      </div>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap, marginRight: 4, width: 24 }}>
          {DAYS.map((d, i) => (
            <div key={d} style={{ height: cellSize, fontSize: 10, color: "#8B949E", lineHeight: `${cellSize}px`, visibility: i % 2 === 1 ? "visible" : "hidden" }}>{d}</div>
          ))}
        </div>
        <div style={{ display: "flex", gap }}>
          {heatmap.map((wk, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap }}>
              {wk.map((day, di) => (
                <div key={di}
                  style={{ width: cellSize, height: cellSize, borderRadius: 3, background: heatCol(day.count, day.isFuture), border: day.isFuture ? "none" : "1px solid rgba(255,255,255,0.03)", cursor: day.isFuture ? "default" : "pointer", flexShrink: 0, transition: "transform 0.1s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.3)"; if (!day.isFuture) { const r = e.currentTarget.getBoundingClientRect(); setTip({ x: r.left, y: r.top, ...day }); } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; setTip(null); }} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8, justifyContent: "flex-end" }}>
        <span style={{ fontSize: 11, color: "#8B949E" }}>Less</span>
        {[0, 2, 4, 6, 9].map(c => <div key={c} style={{ width: 16, height: 16, borderRadius: 3, background: heatCol(c, false), border: "1px solid rgba(255,255,255,0.03)" }} />)}
        <span style={{ fontSize: 11, color: "#8B949E" }}>More</span>
      </div>
      {tip && (
        <div style={{ position: "fixed", left: tip.x - 36, top: tip.y - 50, background: "#1C2128", border: "1px solid #30363D", borderRadius: 6, padding: "8px 12px", fontSize: 12, color: "#E6EDF3", pointerEvents: "none", zIndex: 999, boxShadow: "0 4px 16px rgba(0,0,0,.5)" }}>
          <div style={{ fontWeight: 600 }}>{tip.count} problem{tip.count !== 1 ? "s" : ""}</div>
          <div style={{ color: "#8B949E" }}>{tip.date}</div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════════════════════════════════════
function Dashboard({ progress, activity, settings, onSetDailyGoal, onNavigate, onImport, onSelectProblem, onQuickPractice }) {
  const solved = ALL_PROBLEMS.filter(p => ["Solved", "Revised"].includes(progress[p.id]?.status)).length;
  const total = ALL_PROBLEMS.length;
  const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
  const easy = ALL_PROBLEMS.filter(p => p.difficulty === "Easy");
  const medium = ALL_PROBLEMS.filter(p => p.difficulty === "Medium");
  const hard = ALL_PROBLEMS.filter(p => p.difficulty === "Hard");
  const eS = easy.filter(p => ["Solved", "Revised"].includes(progress[p.id]?.status)).length;
  const mS = medium.filter(p => ["Solved", "Revised"].includes(progress[p.id]?.status)).length;
  const hS = hard.filter(p => ["Solved", "Revised"].includes(progress[p.id]?.status)).length;
  const today = todayKey();
  const solvedToday = Object.values(progress).filter(v => v.lastSolved === today).length;
  const revisedToday = Object.values(progress).filter(v => (v.revisionHistory || []).some(r => r.done && r.doneDate === today)).length;
  const GOAL = settings.dailyGoal;
  const streak = computeStreak(activity);
  const timerStats = loadTimerStats();

  const solvedCount = useCountUp(solved, 1000, true);
  const todayCount = useCountUp(solvedToday, 800, true);
  const revisedCount = useCountUp(revisedToday, 800, true);
  const streakCount = useCountUp(streak, 800, true);

  const revQueue = ALL_PROBLEMS.filter(p => {
    const pr = progress[p.id];
    if (!pr || !(pr.revisionHistory || []).length) return false;
    return pr.revisionHistory.some(r => !r.done && r.dueDate <= today);
  });

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <PersonalRecordsCard activity={activity} />

      {/* ── Two-column layout ── */}
      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Left: Overall Progress */}
        <Card style={{ gridColumn: "1 / 2" }}>
          <SectionTitle>Overall Progress</SectionTitle>
          <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
            <RadialRing pct={pct} animate />
            <div style={{ flex: 1, minWidth: 160, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontSize: 13, color: "#8B949E" }}>
                <span style={{ fontSize: 26, fontWeight: 700, color: "#E6EDF3", fontFamily: "monospace" }}>{solvedCount}</span>
                {" "}<span>/ {total} problems solved</span>
              </div>
              {[
                { label: "Easy", s: eS, t: easy.length, color: "#3FB950" },
                { label: "Medium", s: mS, t: medium.length, color: "#E3B341" },
                { label: "Hard", s: hS, t: hard.length, color: "#F85149" },
              ].map(x => (
                <div key={x.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: x.color, fontWeight: 600 }}>{x.label}</span>
                    <span style={{ fontSize: 12, color: "#8B949E", fontFamily: "monospace" }}>{x.s} / {x.t}</span>
                  </div>
                  <ProgressBar value={x.s} max={x.t} color={x.color} height={5} animate />
                </div>
              ))}
              <div style={{ borderTop: "1px solid #21262D", paddingTop: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4, gap: 8 }}>
                  <span style={{ fontSize: 12, color: "#8B949E" }}>Daily Goal</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button onClick={() => onSetDailyGoal(GOAL - 1)} style={{ width: 20, height: 20, borderRadius: 5, border: "1px solid #21262D", background: "#161B22", color: "#8B949E", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>−</button>
                    <span style={{ fontSize: 12, fontFamily: "monospace", color: "#A78BFA", minWidth: 36, textAlign: "center" }}>{solvedToday} / {GOAL}</span>
                    <button onClick={() => onSetDailyGoal(GOAL + 1)} style={{ width: 20, height: 20, borderRadius: 5, border: "1px solid #21262D", background: "#161B22", color: "#8B949E", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>+</button>
                  </div>
                </div>
                <ProgressBar value={solvedToday} max={GOAL} color="#A78BFA" height={5} animate />
              </div>
            </div>
          </div>
        </Card>

        {/* Right: Motivation Card */}
        <MotivationCard style={{ gridColumn: "2 / 3" }} />
      </div>

      {/* Stats strip */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[
          { icon: "🔥", val: streakCount, suffix: streak === 1 ? " Day Streak" : " Day Streak", color: "#F59E0B" },
          { icon: "✓", val: todayCount, suffix: " Solved Today", color: "#3FB950" },
          { icon: "✦", val: revisedCount, suffix: " Revised Today", color: "#A78BFA" },
          { icon: "⏱", val: timerStats.sessions, suffix: " Study Sessions", color: "#6366f1" },
          { icon: "⚡", val: timerStats.xp, suffix: " Timer XP", color: "#8b5cf6" },
        ].map(({ icon, val, suffix, color }) => (
          <Card key={suffix} style={{ flex: "1 1 140px", textAlign: "center", padding: "14px 12px" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color, fontFamily: "monospace" }}>{icon} {val}</div>
            <div style={{ fontSize: 11, color: "#8B949E", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{suffix}</div>
          </Card>
        ))}
      </div>

      <SummaryCard progress={progress} activity={activity} />
      <DangerZoneCard progress={progress} onSelectProblem={onSelectProblem} />

      {/* Quick Practice */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>🎲 Quick Practice</div>
            <div style={{ fontSize: 13, color: "#C9D1D9" }}>Generate Random 5 Questions</div>
          </div>
          <button onClick={onQuickPractice} style={{ padding: "9px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: "1px solid #A78BFA40", background: "rgba(167,139,250,.12)", color: "#A78BFA", whiteSpace: "nowrap" }}>
            🎲 Generate Practice Set
          </button>
        </div>
      </Card>

      {/* Revision Queue */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <SectionTitle>Revision Due Today</SectionTitle>
          <span style={{ fontSize: 11, fontFamily: "monospace", background: "rgba(167,139,250,.12)", color: "#A78BFA", padding: "2px 8px", borderRadius: 99 }}>{revQueue.length} due</span>
        </div>
        {revQueue.length === 0
          ? <p style={{ fontSize: 13, color: "#484F58", textAlign: "center", padding: "16px 0" }}>No revisions due — keep solving! 🔥</p>
          : revQueue.slice(0, 5).map(p => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "#161B22", borderRadius: 8, border: "1px solid #21262D", marginBottom: 6 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, overflow: "hidden" }}>
                  <span style={{ fontSize: 13, color: "#C9D1D9", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</span>
                  <NotesIndicator progress={progress} problemId={p.id} />
                </div>
                <div style={{ fontSize: 11, color: "#8B949E", marginTop: 2 }}>{p.subtopicTitle}</div>
              </div>
              <DiffBadge d={p.difficulty} />
              <LinkPills p={p} />
            </div>
          ))
        }
      </Card>

      {/* Topic Progress */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <SectionTitle>Topic Progress</SectionTitle>
          <button onClick={() => onNavigate("roadmap")} style={{ fontSize: 12, color: "#A78BFA", background: "none", border: "none", cursor: "pointer" }}>View Roadmap →</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SHEET.map(step => {
            const probs = step.subtopics.flatMap(s => s.problems);
            const s = probs.filter(p => ["Solved", "Revised"].includes(progress[p.id]?.status)).length;
            const t = probs.length;
            return (
              <div key={step.stepId}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: "#C9D1D9", fontWeight: 500 }}>{step.stepTitle}</span>
                  <span style={{ fontSize: 12, fontFamily: "monospace", color: step.color }}>{s}/{t}</span>
                </div>
                <ProgressBar value={s} max={t} color={step.color} height={5} animate />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Heatmap */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <SectionTitle>Activity — Last 12 Months</SectionTitle>
        </div>
        <GithubHeatmap activity={activity} />
      </Card>

      {/* Backup */}
      <Card>
        <SectionTitle>Local Backup</SectionTitle>
        <p style={{ fontSize: 12, color: "#8B949E", marginBottom: 12 }}>Export your progress as JSON, or restore from a previous backup.</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={() => exportProgress(progress, activity)} style={{ padding: "9px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: "1px solid #A78BFA40", background: "rgba(167,139,250,.12)", color: "#A78BFA" }}>⬇ Export Progress</button>
          <label style={{ padding: "9px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: "1px solid #21262D", background: "#161B22", color: "#8B949E" }}>
            ⬆ Import Progress
            <input type="file" accept="application/json" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) onImport(f); e.target.value = ""; }} />
          </label>
        </div>
      </Card>
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// ROADMAP
// ════════════════════════════════════════════════════════════════════════════
function Roadmap({ progress, onSelectProblem }) {
  const initExp = {};
  SHEET.forEach(st => {
    initExp[st.stepId] = true;
    st.subtopics.forEach(sub => { initExp[sub.id] = false; });
  });
  const [exp, setExp] = useState(initExp);
  const toggle = id => setExp(e => ({ ...e, [id]: !e[id] }));

  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "#E6EDF3", marginBottom: 4 }}>A2Z DSA Roadmap</h2>
      <p style={{ fontSize: 13, color: "#8B949E", marginBottom: 16 }}>Striver's structured path — {SHEET.map(s => s.stepTitle.replace(/^Step \d+:\s*/, "")).join(" → ")}</p>
      {SHEET.map((step, si) => {
        const allP = step.subtopics.flatMap(s => s.problems);
        const sv = allP.filter(p => ["Solved", "Revised"].includes(progress[p.id]?.status)).length;
        const tot = allP.length;
        const open = exp[step.stepId];
        return (
          <div key={step.stepId} style={{ border: "1px solid #21262D", borderRadius: 12, overflow: "hidden", background: "#0D1117", marginBottom: 10 }}>
            <button onClick={() => toggle(step.stepId)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, fontFamily: "monospace", flexShrink: 0, background: `${step.color}16`, color: step.color, border: `1px solid ${step.color}30` }}>{si + 1}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#E6EDF3" }}>{step.stepTitle}</span>
                  <span style={{ fontSize: 12, fontFamily: "monospace", color: step.color, flexShrink: 0, marginLeft: 8 }}>{sv}/{tot}</span>
                </div>
                <ProgressBar value={sv} max={tot} color={step.color} height={3} />
              </div>
              <span style={{ color: "#484F58", fontSize: 12, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s", flexShrink: 0 }}>▼</span>
            </button>
            {open && (
              <div style={{ borderTop: "1px solid #21262D" }}>
                {step.subtopics.map(sub => {
                  const subSv = sub.problems.filter(p => ["Solved", "Revised"].includes(progress[p.id]?.status)).length;
                  const subTot = sub.problems.length;
                  const subOpen = exp[sub.id];
                  return (
                    <div key={sub.id} style={{ borderBottom: "1px solid #161B22" }}>
                      <button onClick={() => toggle(sub.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: step.color, opacity: .5, flexShrink: 0 }} />
                        <span style={{ flex: 1, fontSize: 13, color: "#C9D1D9" }}>{sub.title}</span>
                        <span style={{ fontSize: 11, fontFamily: "monospace", color: "#8B949E", marginRight: 8 }}>{subSv}/{subTot}</span>
                        <div style={{ width: 64 }}><ProgressBar value={subSv} max={subTot} color={step.color} height={3} /></div>
                        <span style={{ color: "#484F58", fontSize: 11, marginLeft: 8, transform: subOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s", flexShrink: 0 }}>▼</span>
                      </button>
                      {subOpen && (
                        <div style={{ margin: "0 12px 10px", borderRadius: 8, border: "1px solid #21262D", overflow: "hidden", background: "#161B22" }}>
                          {sub.problems.map((p, pi) => {
                            const st = progress[p.id]?.status || "Not Started";
                            const isDone = ["Solved", "Revised"].includes(st);
                            return (
                              <div key={p.id} onClick={() => onSelectProblem(p)}
                                style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderBottom: pi < sub.problems.length - 1 ? "1px solid #21262D" : "none", cursor: "pointer" }}
                                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.02)"}
                                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                                <div style={{ width: 18, height: 18, borderRadius: 4, border: `1px solid ${isDone ? SC(st) : "#30363D"}`, background: isDone ? `${SC(st)}18` : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                  {isDone && <span style={{ color: SC(st), fontSize: 10 }}>✓</span>}
                                </div>
                                <span style={{ fontSize: 11, color: "#484F58", fontFamily: "monospace", width: 20, flexShrink: 0 }}>{String(pi + 1).padStart(2, "0")}</span>
                                <span style={{ flex: 1, fontSize: 13, color: "#C9D1D9", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</span>
                                <NotesIndicator progress={progress} problemId={p.id} />
                                <DiffBadge d={p.difficulty} />
                                <LinkPills p={p} />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PROBLEM LIST
// ════════════════════════════════════════════════════════════════════════════
function ProblemList({ progress, onSelect }) {
  const [search, setSearch] = useState("");
  const [diffF, setDiffF] = useState("");
  const [statF, setStatF] = useState("");
  const [stepF, setStepF] = useState("");
  const [tagF, setTagF] = useState("");
  const [sort, setSort] = useState({ key: "id", dir: 1 });

  const steps = [...new Set(ALL_PROBLEMS.map(p => p.stepTitle))];
  const patternTags = [...new Set(ALL_PROBLEMS.flatMap(p => p.patternTags || []))].sort();

  const list = useMemo(() => {
    return ALL_PROBLEMS
      .filter(p => {
        if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
        if (diffF && p.difficulty !== diffF) return false;
        const st = progress[p.id]?.status || "Not Started";
        if (statF && st !== statF) return false;
        if (stepF && p.stepTitle !== stepF) return false;
        if (tagF && !(p.patternTags || []).includes(tagF)) return false;
        return true;
      })
      .sort((a, b) => {
        let av = sort.key === "status" ? (progress[a.id]?.status || "Not Started") : a[sort.key];
        let bv = sort.key === "status" ? (progress[b.id]?.status || "Not Started") : b[sort.key];
        return (av < bv ? -1 : av > bv ? 1 : 0) * sort.dir;
      });
  }, [search, diffF, statF, stepF, tagF, sort, progress]);

  const SH = ({ k, label, w }) => (
    <th onClick={() => setSort(s => ({ key: k, dir: s.key === k ? -s.dir : 1 }))}
      style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.07em", cursor: "pointer", whiteSpace: "nowrap", width: w }}>
      {label} {sort.key === k && <span style={{ color: "#A78BFA" }}>{sort.dir > 0 ? "↑" : "↓"}</span>}
    </th>
  );

  const selStyle = { background: "#161B22", border: "1px solid #30363D", color: "#C9D1D9", padding: "6px 10px", borderRadius: 8, fontSize: 12, outline: "none" };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#484F58", fontSize: 13 }}>⌕</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search problems…"
            style={{ width: "100%", paddingLeft: 28, paddingRight: 12, paddingTop: 7, paddingBottom: 7, background: "#161B22", border: "1px solid #30363D", borderRadius: 8, color: "#C9D1D9", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
        </div>
        <select value={diffF} onChange={e => setDiffF(e.target.value)} style={selStyle}><option value="">Difficulty</option>{["Easy", "Medium", "Hard"].map(o => <option key={o}>{o}</option>)}</select>
        <select value={statF} onChange={e => setStatF(e.target.value)} style={selStyle}><option value="">Status</option>{["Solved", "Revised", "Attempted", "Not Started"].map(o => <option key={o}>{o}</option>)}</select>
        <select value={stepF} onChange={e => setStepF(e.target.value)} style={selStyle}><option value="">Step</option>{steps.map(o => <option key={o}>{o}</option>)}</select>
        {patternTags.length > 0 && <select value={tagF} onChange={e => setTagF(e.target.value)} style={selStyle}><option value="">Pattern</option>{patternTags.map(o => <option key={o}>{o}</option>)}</select>}
        {(search || diffF || statF || stepF || tagF) && <button onClick={() => { setSearch(""); setDiffF(""); setStatF(""); setStepF(""); setTagF(""); }} style={{ ...selStyle, cursor: "pointer", color: "#8B949E" }}>✕ Clear</button>}
        <span style={{ fontSize: 12, color: "#8B949E", marginLeft: 4 }}>{list.length} problems</span>
      </div>
      <div style={{ border: "1px solid #21262D", borderRadius: 12, overflow: "hidden", background: "#0D1117" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
            <thead style={{ background: "#161B22", borderBottom: "1px solid #21262D" }}>
              <tr>
                <SH k="id" label="#" w={48} />
                <SH k="name" label="Problem" w="auto" />
                <SH k="difficulty" label="Difficulty" w={100} />
                <SH k="status" label="Status" w={120} />
                <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.07em", width: 140 }}>Links</th>
                <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.07em", width: 110 }}>Last Revised</th>
                <SH k="subtopicTitle" label="Section" w={140} />
              </tr>
            </thead>
            <tbody>
              {list.map((p, idx) => {
                const st = progress[p.id]?.status || "Not Started";
                const lastRevised = progress[p.id]?.lastRevised;
                return (
                  <tr key={p.id} onClick={() => onSelect(p)}
                    style={{ borderBottom: "1px solid #21262D", cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.018)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "11px 12px", fontSize: 11, color: "#484F58", fontFamily: "monospace" }}>{String(idx + 1).padStart(3, "0")}</td>
                    <td style={{ padding: "11px 12px", fontSize: 13, color: "#C9D1D9" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span>{p.name}</span>
                        <NotesIndicator progress={progress} problemId={p.id} />
                      </div>
                    </td>
                    <td style={{ padding: "11px 12px" }}><DiffBadge d={p.difficulty} /></td>
                    <td style={{ padding: "11px 12px" }}><StatusBadge s={st} /></td>
                    <td style={{ padding: "11px 12px" }}><LinkPills p={p} /></td>
                    <td style={{ padding: "11px 12px", fontSize: 11, fontWeight: 600, color: daysAgoColor(lastRevised) }}>{daysAgoLabel(lastRevised)}</td>
                    <td style={{ padding: "11px 12px", fontSize: 11, color: "#8B949E" }}>{p.subtopicTitle}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {list.length === 0 && <div style={{ textAlign: "center", padding: "40px 0", fontSize: 13, color: "#484F58" }}>No problems match your filters.</div>}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PRACTICE MODE
// ════════════════════════════════════════════════════════════════════════════
function PracticeMode({ progress, practice, setPractice, onSelectProblem }) {
  const topics = ["Any", ...SHEET.map(s => s.stepTitle)];
  const [topic, setTopic] = useState("Any");
  const [diffs, setDiffs] = useState(["Any"]);
  const [sources, setSources] = useState([...STATUS_SOURCES]);
  const [count, setCount] = useState(5);

  const selStyle = { background: "#161B22", border: "1px solid #30363D", color: "#C9D1D9", padding: "6px 10px", borderRadius: 8, fontSize: 12, outline: "none" };

  const [emptyReason, setEmptyReason] = useState(null);

  const handleGenerate = () => {
    const questions = generatePracticeSet(progress, { topic, difficulties: diffs, sources, count });
    if (questions.length === 0) {
      const solvedCount = ALL_PROBLEMS.filter(p => ["Solved","Revised"].includes(progress[p.id]?.status)).length;
      const attemptedCount = ALL_PROBLEMS.filter(p => progress[p.id]?.status === "Attempted").length;
      let reason = "No problems match your current filters.";
      if (sources.length === 1 && sources[0] === "Solved" && solvedCount === 0)
        reason = "You haven't solved any problems yet. Start solving problems on the Roadmap first!";
      else if (sources.length === 1 && sources[0] === "Revised" && ALL_PROBLEMS.filter(p => progress[p.id]?.status === "Revised").length === 0)
        reason = "You haven't revised any problems yet. Solve some problems and come back to revise them!";
      else if (sources.length === 1 && sources[0] === "Attempted" && attemptedCount === 0)
        reason = "You have no attempted problems. Mark some problems as Attempted first!";
      else if (sources.length === 0)
        reason = "Please select at least one status source to generate a set.";
      setEmptyReason(reason);
      setPractice(null);
      return;
    }
    setEmptyReason(null);
    setPractice({ questionIds: questions.map(q => q.id), completed: {}, createdAt: todayKey(), filters: { topic, diffs, sources, count } });
  };

  const toggleCompleted = (id) => {
    setPractice(p => { if (!p) return p; return { ...p, completed: { ...p.completed, [id]: !p.completed[id] } }; });
  };

  const questions = practice ? practice.questionIds.map(id => ALL_PROBLEMS.find(p => p.id === id)).filter(Boolean) : [];
  const solvedCount = practice ? questions.filter(q => practice.completed[q.id]).length : 0;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "#E6EDF3", marginBottom: 4 }}>🎲 Practice Mode</h2>
      <p style={{ fontSize: 13, color: "#8B949E", marginTop: -12 }}>Generate a custom practice session from any topic, difficulty, or progress status.</p>
      <Card>
        <SectionTitle>Build Your Set</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ fontSize: 12, color: "#8B949E", marginBottom: 6 }}>Topic</div>
            <select value={topic} onChange={e => setTopic(e.target.value)} style={{ ...selStyle, width: "100%" }}>
              {topics.map(t => <option key={t} value={t}>{t === "Any" ? "Any Topic" : t.replace(/^Step \d+:\s*/, "")}</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#8B949E", marginBottom: 6 }}>Difficulty</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Easy", "Medium", "Hard", "Any"].map(d => {
                const on = diffs.includes(d);
                return (
                  <button key={d} onClick={() => {
                    if (d === "Any") { setDiffs(["Any"]); return; }
                    setDiffs(arr => {
                      const withoutAny = arr.filter(x => x !== "Any");
                      const next = withoutAny.includes(d) ? withoutAny.filter(x => x !== d) : [...withoutAny, d];
                      return next.length ? next : ["Any"];
                    });
                  }}
                    style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${on ? (d === "Any" ? "#A78BFA60" : DC(d) + "60") : "#21262D"}`, background: on ? (d === "Any" ? "rgba(167,139,250,.12)" : DB(d)) : "#161B22", color: on ? (d === "Any" ? "#A78BFA" : DC(d)) : "#8B949E" }}>
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#8B949E", marginBottom: 6 }}>Source</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {STATUS_SOURCES.map(s => {
                const on = sources.includes(s);
                return (
                  <button key={s} onClick={() => setSources(arr => {
                    if (arr.length === STATUS_SOURCES.length) return [s];
                    const next = arr.includes(s) ? arr.filter(x => x !== s) : [...arr, s];
                    return next.length ? next : [...STATUS_SOURCES];
                  })}
                    style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${on ? SC(s) + "60" : "#21262D"}`, background: on ? SB(s) : "#161B22", color: on ? SC(s) : "#8B949E", display: "flex", alignItems: "center", gap: 6 }}>
                    <span>{on ? "☑" : "☐"}</span>{s}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: "#8B949E" }}>Number of Questions</span>
              <span style={{ fontSize: 12, fontFamily: "monospace", color: "#A78BFA" }}>{count}</span>
            </div>
            <input type="range" min={1} max={20} value={count} onChange={e => setCount(Number(e.target.value))} style={{ width: "100%", accentColor: "#A78BFA" }} />
          </div>
          <button onClick={handleGenerate} style={{ padding: "11px 0", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", border: "1px solid #A78BFA40", background: "rgba(167,139,250,.12)", color: "#A78BFA" }}>
            {practice ? "🔁 Regenerate" : "Generate Practice Set"}
          </button>
          {emptyReason && (
            <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 10, color: "#fca5a5", fontSize: 13, padding: "12px 14px", display: "flex", alignItems: "flex-start", gap: 10, marginTop: 4 }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>🚫</span>
              <span>{emptyReason}</span>
            </div>
          )}
        </div>
      </Card>
      {practice && (
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <SectionTitle>Practice Set</SectionTitle>
            <button onClick={handleGenerate} style={{ fontSize: 12, color: "#A78BFA", background: "none", border: "none", cursor: "pointer" }}>🔁 Regenerate</button>
          </div>
          <div style={{ fontSize: 13, color: "#8B949E", marginBottom: 12 }}>
            {questions.length} Question{questions.length === 1 ? "" : "s"} · Solved: <span style={{ color: "#3FB950", fontFamily: "monospace" }}>{solvedCount} / {questions.length}</span>
          </div>
          <div style={{ marginBottom: 12 }}><ProgressBar value={solvedCount} max={questions.length} color="#3FB950" height={5} /></div>
          {questions.length === 0
            ? <p style={{ fontSize: 13, color: "#484F58", textAlign: "center", padding: "16px 0" }}>No problems match these filters.</p>
            : (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {questions.map((p, i) => {
                  const done = !!practice.completed[p.id];
                  return (
                    <motion.div key={p.id}
                      layout
                      animate={{ background: done ? "rgba(63,185,80,0.06)" : "#161B22" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: "1px solid #21262D" }}>
                      <span style={{ fontSize: 11, color: "#484F58", fontFamily: "monospace", width: 20, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                      <div style={{ flex: 1, minWidth: 0, cursor: "pointer" }} onClick={() => onSelectProblem(p)}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, overflow: "hidden" }}>
                          <motion.span
                            animate={{ opacity: done ? 0.65 : 1 }}
                            transition={{ duration: 0.25 }}
                            style={{ fontSize: 13, color: done ? "#8B949E" : "#C9D1D9", textDecoration: done ? "line-through" : "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "inline-block" }}>{p.name}</motion.span>
                          <NotesIndicator progress={progress} problemId={p.id} />
                        </div>
                        <div style={{ fontSize: 11, color: "#8B949E", marginTop: 2 }}>{p.subtopicTitle}</div>
                      </div>
                      <DiffBadge d={p.difficulty} />
                      <LinkPills p={p} />
                      <motion.button onClick={() => toggleCompleted(p.id)}
                        whileTap={{ scale: 0.94 }}
                        animate={done ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                        transition={{ duration: 0.28, ease: [0.34, 1.2, 0.64, 1] }}
                        style={{ padding: "6px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer", border: `1px solid ${done ? "#3FB95050" : "#21262D"}`, background: done ? "rgba(63,185,80,.12)" : "#0D1117", color: done ? "#3FB950" : "#8B949E", whiteSpace: "nowrap", flexShrink: 0 }}>
                        {done ? "✓ Completed" : "Mark Complete"}
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            )
          }
        </Card>
      )}
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PROBLEM DETAIL
// ════════════════════════════════════════════════════════════════════════════
function ProblemDetail({ problem, progress, onBack, onUpdate, onActivity }) {
  const pr = progress[problem.id] || {};
  const [status, setStatus] = useState(pr.status || "Not Started");
  const [timesSolved, setTimesSolved] = useState(pr.timesSolved || 0);
  const [tags, setTags] = useState(pr.mistakeTags || []);
  const [notes, setNotes] = useState(pr.notes || "");
  const [saved, setSaved] = useState(false);
  const [revCompleted, setRevCompleted] = useState(null);

  const STATUSES = ["Not Started", "Attempted", "Solved", "Revised"];
  const MTAGS = ["Logic Error", "Edge Case", "Time Complexity", "Space Complexity", "Syntax Error"];

  const handleSave = () => {
    const today = todayKey();
    const wasDone = ["Solved", "Revised"].includes(pr.status);
    const isDone = ["Solved", "Revised"].includes(status);
    let revisionHistory = pr.revisionHistory || [];
    let lastSolved = pr.lastSolved;
    if (isDone && !wasDone) {
      lastSolved = today;
      revisionHistory = buildRevisionHistory(today);
      onActivity(today, 1);
    } else if (!isDone) {
      revisionHistory = [];
    }
    onUpdate(problem.id, { status, timesSolved, mistakeTags: tags, notes, lastSolved, revisionHistory });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const markRevisionDone = (stage) => {
    const today = todayKey();
    const revisionHistory = (pr.revisionHistory || []).map(r => r.stage === stage ? { ...r, done: true, doneDate: today } : r);
    onUpdate(problem.id, { revisionHistory, lastRevised: today });
    onActivity(today, 1);
    setRevCompleted(stage);
    setTimeout(() => setRevCompleted(null), 2000);
  };

  const inputStyle = { background: "#161B22", border: "1px solid #21262D", borderRadius: 8, color: "#C9D1D9", fontSize: 13, padding: "10px 12px", outline: "none", width: "100%", boxSizing: "border-box" };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ maxWidth: 520, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 }}>
      <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#8B949E", background: "none", border: "none", cursor: "pointer", padding: 0 }}>← Back</button>
      <Card>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#E6EDF3", flex: 1, margin: 0, lineHeight: 1.3 }}>{problem.name}</h1>
          <DiffBadge d={problem.difficulty} />
        </div>
        <div style={{ fontSize: 12, color: "#8B949E", marginBottom: 12 }}>{problem.subtopicTitle} · {problem.stepTitle}</div>
        <LinkPills p={problem} />
        {problem.patternTags && problem.patternTags.length > 0 && <div style={{ marginTop: 12 }}><PatternTags tags={problem.patternTags} /></div>}
      </Card>
      <Card>
        <SectionTitle>Status</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {STATUSES.map(s => (
            <motion.button key={s} onClick={() => setStatus(s)}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15 }}
              style={{ padding: "8px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${status === s ? SC(s) + "60" : "#21262D"}`, background: status === s ? SB(s) : "#161B22", color: status === s ? SC(s) : "#8B949E", transition: "background 0.2s ease, border 0.2s ease, color 0.2s ease" }}>
              {s}
            </motion.button>
          ))}
        </div>
      </Card>
      <Card>
        <SectionTitle>Times Solved</SectionTitle>
        <div style={{ display: "flex", gap: 8 }}>
          {[1, 2, 3, 4].map(n => (
            <button key={n} onClick={() => setTimesSolved(n)}
              style={{ width: 40, height: 36, borderRadius: 8, border: `1px solid ${timesSolved === n ? "#A78BFA60" : "#21262D"}`, background: timesSolved === n ? "rgba(167,139,250,.12)" : "#161B22", color: timesSolved === n ? "#A78BFA" : "#8B949E", fontSize: 13, fontFamily: "monospace", cursor: "pointer" }}>
              {n === 4 ? "4+" : n}
            </button>
          ))}
        </div>
      </Card>
      <Card>
        <SectionTitle>Last Revised</SectionTitle>
        <div style={{ fontSize: 14, fontWeight: 600, color: daysAgoColor(pr.lastRevised) }}>{daysAgoLabel(pr.lastRevised)}</div>
      </Card>
      {(pr.revisionHistory || []).length > 0 && (
        <Card>
          <SectionTitle>Spaced Repetition Schedule</SectionTitle>
          {pr.revisionHistory.map(r => {
            const due = new Date(r.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" });
            const overdue = !r.done && r.dueDate <= todayKey();
            const justDone = revCompleted === r.stage;
            return (
              <motion.div key={r.stage}
                animate={{ background: justDone ? "rgba(63,185,80,0.12)" : "rgba(63,185,80,0)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 0", fontSize: 13, borderBottom: "1px solid #21262D" }}>
                <span style={{ color: "#8B949E" }}>Revision {r.stage} ({REVISION_OFFSETS[r.stage - 1]} days)</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={r.done ? "done" : "pending"}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, ease: [0.34, 1.2, 0.64, 1] }}
                      style={{ color: r.done ? "#3FB950" : overdue ? "#F85149" : "#A78BFA", fontFamily: "monospace", fontSize: 12, display: "inline-block" }}>
                      {r.done ? `Done ${new Date(r.doneDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}` : due}
                    </motion.span>
                  </AnimatePresence>
                  {!r.done && (
                    <motion.button onClick={() => markRevisionDone(r.stage)}
                      whileTap={{ scale: 0.93 }}
                      style={{ padding: "3px 9px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer", border: "1px solid #3FB95040", background: "rgba(63,185,80,.1)", color: "#3FB950" }}>
                      Mark Done
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </Card>
      )}
      <Card>
        <SectionTitle>Mistake Tags</SectionTitle>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {MTAGS.map(tag => {
            const on = tags.includes(tag);
            return (
              <button key={tag} onClick={() => setTags(t => on ? t.filter(x => x !== tag) : [...t, tag])}
                style={{ padding: "4px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, cursor: "pointer", border: `1px solid ${on ? "#F8514960" : "#21262D"}`, background: on ? "rgba(248,81,73,.1)" : "#161B22", color: on ? "#F85149" : "#484F58", transition: "all .15s" }}>
                {tag}
              </button>
            );
          })}
        </div>
      </Card>
      <Card>
        <SectionTitle>Personal Notes</SectionTitle>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Your approach, edge cases, key insights…" rows={4} style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }} />
      </Card>
      <motion.button
        onClick={handleSave}
        animate={saved ? { scale: [1, 1.03, 1] } : { scale: 1 }}
        transition={{ duration: 0.32, ease: [0.34, 1.2, 0.64, 1] }}
        style={{ padding: "11px 0", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", border: `1px solid ${saved ? "#3FB95040" : "#A78BFA40"}`, background: saved ? "rgba(63,185,80,.12)" : "rgba(167,139,250,.12)", color: saved ? "#3FB950" : "#A78BFA", transition: "background 0.25s ease, border 0.25s ease, color 0.25s ease" }}>
        {saved ? "✓ Saved" : "Save Progress"}
      </motion.button>
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// SMART STUDY TIMER
// ════════════════════════════════════════════════════════════════════════════
const TIMER_LS = "smart_study_timer_v2";
const TIMER_STATS_LS = "smart_study_stats_v1";
const BREAK_MINS_CONST = 5;

function buildTimerPhases(totalMins) {
  if (totalMins <= 25) return [{ type: "focus", label: "Focus", duration: totalMins * 60, index: 1, of: 1 }];
  const focusMins = Math.floor((totalMins - BREAK_MINS_CONST) / 2);
  return [
    { type: "focus", label: "Focus", duration: focusMins * 60, index: 1, of: 2 },
    { type: "break", label: "Break", duration: BREAK_MINS_CONST * 60, index: null, of: null },
    { type: "focus", label: "Focus", duration: focusMins * 60, index: 2, of: 2 },
  ];
}

function fmtTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function playFocusEndSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [[220, 0], [196, 0.6], [174, 1.2]].forEach(([freq, delay]) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      const comp = ctx.createDynamicsCompressor();
      o.connect(g); g.connect(comp); comp.connect(ctx.destination);
      o.type = "sine"; o.frequency.value = freq;
      g.gain.setValueAtTime(0, ctx.currentTime + delay);
      g.gain.linearRampToValueAtTime(0.55, ctx.currentTime + delay + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 1.8);
      o.start(ctx.currentTime + delay); o.stop(ctx.currentTime + delay + 1.9);
      const o2 = ctx.createOscillator(), g2 = ctx.createGain();
      o2.connect(g2); g2.connect(comp);
      o2.type = "sine"; o2.frequency.value = freq * 2;
      g2.gain.setValueAtTime(0, ctx.currentTime + delay);
      g2.gain.linearRampToValueAtTime(0.18, ctx.currentTime + delay + 0.02);
      g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 1.2);
      o2.start(ctx.currentTime + delay); o2.stop(ctx.currentTime + delay + 1.3);
    });
  } catch (e) {}
}

function playBreakEndSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [[523, 0], [659, 0.18], [784, 0.36], [1047, 0.54]].forEach(([freq, delay]) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = "triangle"; o.frequency.value = freq;
      g.gain.setValueAtTime(0, ctx.currentTime + delay);
      g.gain.linearRampToValueAtTime(0.35, ctx.currentTime + delay + 0.04);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.55);
      o.start(ctx.currentTime + delay); o.stop(ctx.currentTime + delay + 0.6);
    });
  } catch (e) {}
}

function playCompleteSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [[523, 0], [523, 0.12], [523, 0.24], [659, 0.36], [784, 0.52], [1047, 0.72]].forEach(([freq, delay]) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = "sine"; o.frequency.value = freq;
      g.gain.setValueAtTime(0, ctx.currentTime + delay);
      g.gain.linearRampToValueAtTime(0.4, ctx.currentTime + delay + 0.04);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + (freq > 800 ? 1.2 : 0.35));
      o.start(ctx.currentTime + delay); o.stop(ctx.currentTime + delay + 1.3);
    });
  } catch (e) {}
}

function playTickSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.type = "sine"; o.frequency.value = 880;
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.1);
  } catch (e) {}
}

function loadTimerState() { try { const s = localStorage.getItem(TIMER_LS); return s ? JSON.parse(s) : null; } catch { return null; } }
function saveTimerState(s) { try { localStorage.setItem(TIMER_LS, JSON.stringify(s)); } catch {} }
function loadTimerStats() { try { const s = localStorage.getItem(TIMER_STATS_LS); return s ? JSON.parse(s) : { sessions: 0, xp: 0, streak: 0, lastDate: null }; } catch { return { sessions: 0, xp: 0, streak: 0, lastDate: null }; } }
function saveTimerStats(s) { try { localStorage.setItem(TIMER_STATS_LS, JSON.stringify(s)); } catch {} }
function addTimerSession() {
  const st = loadTimerStats();
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  let streak = st.lastDate === today ? st.streak : st.lastDate === yesterday ? st.streak + 1 : 1;
  const updated = { sessions: st.sessions + 1, xp: st.xp + 50, streak, lastDate: today };
  saveTimerStats(updated); return updated;
}

function TimerRing({ progress, type, warning }) {
  const R = 110, cx = 120, cy = 120, C = 2 * Math.PI * R;
  const offset = C - progress * C;
  const color = type === "break" ? "#34d399" : warning ? "#f59e0b" : "#8b5cf6";
  const glowColor = type === "break" ? "#34d39966" : warning ? "#f59e0b66" : "#8b5cf666";
  return (
    <svg width="240" height="240" viewBox="0 0 240 240" style={{ filter: `drop-shadow(0 0 20px ${glowColor})` }}>
      <circle cx={cx} cy={cy} r={R} fill="none" strokeWidth="12" stroke="rgba(255,255,255,0.06)" />
      <circle cx={cx} cy={cy} r={R} fill="none" strokeWidth="12" stroke={color}
        strokeDasharray={C} strokeDashoffset={offset} strokeLinecap="round"
        transform="rotate(-90 120 120)"
        style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1), stroke 0.4s" }} />
      <circle cx={cx} cy={cy} r={R - 18} fill="none" strokeWidth="1" stroke={color} strokeOpacity="0.12" />
    </svg>
  );
}

function StudyTimer({ onBumpActivity }) {
  const saved = loadTimerState();
  const [screen,     setScreen]     = useState(saved?.screen    || "setup");
  const [inputMins,  setInputMins]  = useState(saved?.inputMins || "45");
  const [phases,     setPhases]     = useState(saved?.phases    || []);
  const [phaseIdx,   setPhaseIdx]   = useState(saved?.phaseIdx  || 0);
  const [timeLeft,   setTimeLeft]   = useState(saved?.timeLeft  || 0);
  const [running,    setRunning]    = useState(saved?.running   || false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [timerStats, setTimerStats] = useState(loadTimerStats);
  const phasesRef   = useRef(phases);
  const phaseIdxRef = useRef(phaseIdx);
  const timeLeftRef = useRef(timeLeft);
  const soundRef    = useRef(soundEnabled);
  const tickRef     = useRef(null);
  const prevTimeRef = useRef(null);
  const prevSecsRef = useRef(null);

  useEffect(() => { phasesRef.current   = phases;      }, [phases]);
  useEffect(() => { phaseIdxRef.current = phaseIdx;    }, [phaseIdx]);
  useEffect(() => { timeLeftRef.current = timeLeft;    }, [timeLeft]);
  useEffect(() => { soundRef.current    = soundEnabled;}, [soundEnabled]);
  useEffect(() => {
    saveTimerState({ screen, inputMins, phases, phaseIdx, timeLeft, running });
  }, [screen, inputMins, phases, phaseIdx, timeLeft, running]);
  useEffect(() => { setTimerStats(loadTimerStats()); }, [screen]);

  const advance = useCallback(() => {
    const currentPhases = phasesRef.current;
    const currentIdx    = phaseIdxRef.current;
    const nextIdx       = currentIdx + 1;
    if (nextIdx >= currentPhases.length) {
      setRunning(false); setScreen("done");
      const updated = addTimerSession(); setTimerStats(updated);
      if (onBumpActivity) onBumpActivity();
      if (soundRef.current) playCompleteSound(); return;
    }
    if (soundRef.current) {
      if (currentPhases[currentIdx]?.type === "focus") playFocusEndSound();
      else playBreakEndSound();
    }
    phaseIdxRef.current = nextIdx; setPhaseIdx(nextIdx);
    timeLeftRef.current = currentPhases[nextIdx].duration;
    setTimeLeft(currentPhases[nextIdx].duration);
    prevSecsRef.current = null;
  }, [onBumpActivity]);

  useEffect(() => {
    if (!running) { clearInterval(tickRef.current); return; }
    prevTimeRef.current = Date.now();
    tickRef.current = setInterval(() => {
      const now = Date.now();
      const delta = Math.floor((now - prevTimeRef.current) / 1000);
      if (delta < 1) return;
      prevTimeRef.current = now;
      const current = timeLeftRef.current;
      const next    = Math.max(0, current - delta);
      timeLeftRef.current = next; setTimeLeft(next);
      if (soundRef.current && next > 0 && next <= 10 && next !== prevSecsRef.current) {
        prevSecsRef.current = next; playTickSound();
      }
      if (next <= 0) { clearInterval(tickRef.current); advance(); }
    }, 500);
    return () => clearInterval(tickRef.current);
  }, [running, advance]);

  function startSession() {
    const m = Math.max(1, parseInt(inputMins) || 45);
    const p = buildTimerPhases(m);
    phasesRef.current = p; phaseIdxRef.current = 0; timeLeftRef.current = p[0].duration;
    prevSecsRef.current = null;
    setPhases(p); setPhaseIdx(0); setTimeLeft(p[0].duration);
    setScreen("timer"); setRunning(true);
  }
  function resetTimer() {
    setRunning(false); clearInterval(tickRef.current);
    setScreen("setup"); setPhases([]); setPhaseIdx(0); setTimeLeft(0);
    phasesRef.current = []; phaseIdxRef.current = 0; timeLeftRef.current = 0;
    saveTimerState(null);
  }

  const curPhase    = phases[phaseIdx];
  const totalDur    = curPhase?.duration || 1;
  const ringProgress = curPhase ? (totalDur - timeLeft) / totalDur : 0;
  const mins        = parseInt(inputMins) || 0;
  const focusMins   = mins > 25 ? Math.floor((mins - BREAK_MINS_CONST) / 2) : mins;
  const isWarning   = timeLeft <= 10 && timeLeft > 0 && screen === "timer";
  const accentColor  = curPhase?.type === "break" ? "#34d399" : isWarning ? "#f59e0b" : "#8b5cf6";
  const accentBg     = curPhase?.type === "break" ? "rgba(52,211,153,0.1)"  : isWarning ? "rgba(245,158,11,0.1)"  : "rgba(139,92,246,0.1)";
  const accentBorder = curPhase?.type === "break" ? "rgba(52,211,153,0.3)"  : isWarning ? "rgba(245,158,11,0.3)"  : "rgba(139,92,246,0.25)";

  return (
    <motion.div variants={fadeSlideUp} initial="hidden" animate="show"
      style={{ maxWidth: 520, margin: "0 auto", padding: "8px 0" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#E6EDF3", letterSpacing: "-0.01em" }}>Study Timer</div>
          <div style={{ fontSize: 12, color: "#8B949E", marginTop: 2 }}>Smart focus sessions · synced with tracker</div>
        </div>
        {screen === "timer" && (
          <button onClick={() => setSoundEnabled(s => !s)}
            style={{ background: soundEnabled ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${soundEnabled ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.1)"}`, borderRadius: 10, color: soundEnabled ? "#c4b5fd" : "#484F58", cursor: "pointer", fontSize: 18, padding: "8px 12px" }}>
            {soundEnabled ? "🔔" : "🔕"}
          </button>
        )}
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        {[["🎯", "Sessions", timerStats.sessions], ["⚡", "XP Earned", timerStats.xp], ["🔥", "Streak", timerStats.streak]].map(([icon, lbl, val]) => (
          <div key={lbl} style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 16, marginBottom: 4 }}>{icon}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#E6EDF3", fontFamily: "monospace" }}>{val}</div>
            <div style={{ fontSize: 10, color: "#8B949E", marginTop: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>{lbl}</div>
          </div>
        ))}
      </div>

      {screen === "setup" && (
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 28, display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Session Duration</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input type="number" min="5" max="180" value={inputMins} onChange={e => setInputMins(e.target.value)}
                style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, color: "#E6EDF3", fontSize: 28, fontWeight: 700, fontFamily: "monospace", padding: "12px 16px", outline: "none", textAlign: "center" }} />
              <span style={{ color: "#8B949E", fontSize: 14, fontWeight: 500 }}>min</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[25, 45, 60, 90].map(m => (
              <button key={m} onClick={() => setInputMins(String(m))}
                style={{ flex: 1, background: inputMins === String(m) ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.05)", border: `1px solid ${inputMins === String(m) ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.1)"}`, borderRadius: 10, color: inputMins === String(m) ? "#c4b5fd" : "#8B949E", cursor: "pointer", fontSize: 13, fontWeight: 600, padding: "8px 4px" }}>
                {m}m
              </button>
            ))}
          </div>
          {mins > 25 && (
            <div style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 11, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Session plan</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <div style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.4)", borderRadius: 8, color: "#c4b5fd", fontSize: 12, fontWeight: 700, padding: "5px 12px" }}>⚡ {focusMins} min focus</div>
                <div style={{ color: "#484F58", fontSize: 14 }}>→</div>
                <div style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.35)", borderRadius: 8, color: "#6ee7b7", fontSize: 12, fontWeight: 700, padding: "5px 12px" }}>☕ 5 min break</div>
                <div style={{ color: "#484F58", fontSize: 14 }}>→</div>
                <div style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.4)", borderRadius: 8, color: "#c4b5fd", fontSize: 12, fontWeight: 700, padding: "5px 12px" }}>⚡ {focusMins} min focus</div>
              </div>
            </div>
          )}
          {mins > 0 && mins <= 25 && (
            <div style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 12, padding: "12px 16px", color: "#a5b4fc", fontSize: 13 }}>
              ⚡ Single focus session — {mins} minutes
            </div>
          )}
          <button onClick={startSession} disabled={mins < 1}
            style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1)", border: "none", borderRadius: 14, color: "#fff", cursor: mins < 1 ? "not-allowed" : "pointer", fontSize: 16, fontWeight: 700, padding: "14px", width: "100%", opacity: mins < 1 ? 0.5 : 1 }}>
            Start Session
          </button>
        </div>
      )}

      {screen === "timer" && curPhase && (
        <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${accentBorder}`, borderRadius: 20, padding: "28px 24px", transition: "border-color 0.5s" }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <motion.div key={phaseIdx} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 20, padding: "6px 16px", marginBottom: 6 }}>
                <span style={{ fontSize: 14 }}>{curPhase.type === "break" ? "☕" : "⚡"}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: accentColor, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {curPhase.type === "focus" ? `Focus ${curPhase.index} of ${curPhase.of}` : "Break Time"}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "#8B949E", letterSpacing: "0.04em" }}>
                {curPhase.type === "focus" ? "Stay in the zone. No distractions." : "Step away · Breathe · Hydrate"}
              </div>
            </motion.div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", position: "relative", marginBottom: 8 }}>
            <TimerRing progress={ringProgress} type={curPhase.type} warning={isWarning} />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", width: "100%" }}>
              <div style={{ color: isWarning ? "#fbbf24" : "#E6EDF3", fontSize: 52, fontWeight: 700, letterSpacing: "-0.04em", fontFamily: "monospace", lineHeight: 1, transition: "color 0.3s" }}>
                {fmtTime(timeLeft)}
              </div>
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: running ? accentColor : "#484F58", boxShadow: running ? `0 0 8px ${accentColor}` : "none", transition: "all 0.3s" }} />
                <span style={{ color: "#8B949E", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>{running ? "running" : "paused"}</span>
              </div>
            </div>
          </div>
          {isWarning && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 10, color: "#fbbf24", fontSize: 12, fontWeight: 600, padding: "8px 14px", textAlign: "center", marginBottom: 16 }}>
              ⏰ {timeLeft} second{timeLeft !== 1 ? "s" : ""} remaining
            </motion.div>
          )}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 22, flexWrap: "wrap" }}>
            {phases.map((p, i) => {
              const st = i < phaseIdx ? "done" : i === phaseIdx ? "active" : "upcoming";
              const bg = st === "done" ? "rgba(52,211,153,0.12)" : st === "active" ? accentBg : "rgba(255,255,255,0.04)";
              const bc = st === "done" ? "rgba(52,211,153,0.35)" : st === "active" ? accentBorder : "rgba(255,255,255,0.08)";
              const tc = st === "done" ? "#6ee7b7" : st === "active" ? accentColor : "#484F58";
              const icon = p.type === "break" ? "☕" : "⚡";
              const lbl  = p.type === "break" ? "Break" : `Focus ${p.index}/${p.of}`;
              return (
                <div key={i} style={{ background: bg, border: `1px solid ${bc}`, borderRadius: 10, color: tc, fontSize: 11, fontWeight: 700, padding: "6px 14px", display: "flex", alignItems: "center", gap: 5, textTransform: "uppercase", letterSpacing: "0.05em", transition: "all 0.3s" }}>
                  {st === "done" && <span style={{ fontSize: 10 }}>✓</span>}
                  <span>{icon} {lbl}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setRunning(r => !r)}
              style={{ flex: 1, background: running ? "rgba(255,255,255,0.07)" : `linear-gradient(135deg,${accentColor === "#34d399" ? "#34d399,#059669" : accentColor === "#f59e0b" ? "#f59e0b,#d97706" : "#8b5cf6,#6366f1"})`, border: running ? "1px solid rgba(255,255,255,0.15)" : "none", borderRadius: 12, color: "#fff", cursor: "pointer", fontSize: 15, fontWeight: 700, padding: "13px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>{running ? "⏸" : "▶"}</span>
              {running ? "Pause" : "Resume"}
            </button>
            <button onClick={resetTimer}
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 12, color: "#fca5a5", cursor: "pointer", fontSize: 14, fontWeight: 600, padding: "13px 20px" }}>
              ↺
            </button>
          </div>
        </div>
      )}

      {screen === "done" && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(52,211,153,0.25)", borderRadius: 20, padding: 32, textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>🎉</div>
          <div style={{ color: "#E6EDF3", fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Session Complete!</div>
          <div style={{ color: "#8B949E", fontSize: 14, marginBottom: 24 }}>You crushed it. Activity logged to your tracker.</div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 28 }}>
            {[["#34d399","rgba(52,211,153,0.12)","rgba(52,211,153,0.3)","+50","XP Earned"],
              ["#a78bfa","rgba(139,92,246,0.12)","rgba(139,92,246,0.3)",timerStats.sessions,"Total Sessions"],
              ["#fbbf24","rgba(245,158,11,0.12)","rgba(245,158,11,0.3)",`${timerStats.streak}🔥`,"Day Streak"]].map(([color,bg,border,val,lbl]) => (
              <div key={lbl} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 12, padding: "10px 20px" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color, fontFamily: "monospace" }}>{val}</div>
                <div style={{ fontSize: 10, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>{lbl}</div>
              </div>
            ))}
          </div>
          <button onClick={resetTimer}
            style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1)", border: "none", borderRadius: 14, color: "#fff", cursor: "pointer", fontSize: 15, fontWeight: 700, padding: "14px 32px", width: "100%" }}>
            Start Another Session
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// DAILY STUDY PLANNER
// ════════════════════════════════════════════════════════════════════════════
const PLANNER_KEY = "dsa_daily_planner_v1";
function loadPlanner() { try { const s = localStorage.getItem(PLANNER_KEY); return s ? JSON.parse(s) : { tasks: [], history: [] }; } catch { return { tasks: [], history: [] }; } }
function savePlanner(data) { try { localStorage.setItem(PLANNER_KEY, JSON.stringify(data)); } catch {} }
function formatDate(iso) { const d = new Date(iso); return d.toLocaleDateString("en-US", { day: "numeric", month: "long" }); }

function DailyPlanner() {
  const todayISO = new Date().toISOString().slice(0, 10);
  const [data, setData] = useState(() => {
    const saved = loadPlanner();
    const carryForward = [], completedOld = [];
    saved.tasks.forEach(t => {
      if (t.date === todayISO) carryForward.push(t);
      else if (t.done) completedOld.push({ ...t, movedOn: todayISO });
      else carryForward.push(t);
    });
    const history = [...(saved.history || []), ...completedOld].slice(-100);
    const newData = { tasks: carryForward, history };
    if (JSON.stringify(newData) !== JSON.stringify(saved)) savePlanner(newData);
    return newData;
  });
  const [input, setInput]       = useState("");
  const [filter, setFilter]     = useState("all");
  const [showHist, setShowHist] = useState(false);
  const inputRef = useRef(null);
  const persist = (next) => { setData(next); savePlanner(next); };

  function addTask() {
    const text = input.trim(); if (!text) return;
    persist({ ...data, tasks: [...data.tasks, { id: Date.now(), text, done: false, date: todayISO }] });
    setInput(""); inputRef.current?.focus();
  }
  function toggleTask(id) { persist({ ...data, tasks: data.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t) }); }
  function deleteTask(id) { persist({ ...data, tasks: data.tasks.filter(t => t.id !== id) }); }
  function clearCompleted() {
    const completed = data.tasks.filter(t => t.done).map(t => ({ ...t, movedOn: todayISO }));
    persist({ tasks: data.tasks.filter(t => !t.done), history: [...data.history, ...completed].slice(-100) });
  }

  const total = data.tasks.length;
  const done  = data.tasks.filter(t => t.done).length;
  const pct   = total ? Math.round((done / total) * 100) : 0;
  const isOverdue = t => t.date < todayISO && !t.done;

  const sorted = [...data.tasks]
    .filter(t => filter === "pending" ? !t.done : filter === "done" ? t.done : true)
    .sort((a, b) => {
      if (isOverdue(a) && !isOverdue(b)) return -1;
      if (!isOverdue(a) && isOverdue(b)) return 1;
      if (!a.done && b.done) return -1;
      if (a.done && !b.done) return 1;
      return a.id - b.id;
    });

  const cardBg = "rgba(255,255,255,0.04)", border = "1px solid rgba(255,255,255,0.08)";

  return (
    <motion.div variants={fadeSlideUp} initial="hidden" animate="show" style={{ maxWidth: 620, margin: "0 auto", padding: "8px 0" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#E6EDF3", letterSpacing: "-0.01em" }}>📅 Daily Study Planner</div>
          <div style={{ fontSize: 12, color: "#8B949E", marginTop: 3 }}>{new Date().toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
        </div>
        {data.history.length > 0 && (
          <button onClick={() => setShowHist(h => !h)}
            style={{ background: "rgba(255,255,255,0.05)", border, borderRadius: 10, color: "#8B949E", cursor: "pointer", fontSize: 12, fontWeight: 600, padding: "7px 14px" }}>
            {showHist ? "Hide History" : `History (${data.history.length})`}
          </button>
        )}
      </div>

      {total > 0 && (
        <div style={{ background: cardBg, border, borderRadius: 14, padding: "14px 18px", marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#E6EDF3" }}>Today's Progress</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: done === total ? "#34d399" : "#A78BFA", fontFamily: "monospace" }}>{done} / {total} · {pct}%</span>
          </div>
          <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: done === total ? "linear-gradient(90deg,#34d399,#059669)" : "linear-gradient(90deg,#8b5cf6,#6366f1)", borderRadius: 3, transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)" }} />
          </div>
          {done === total && total > 0 && <div style={{ marginTop: 8, fontSize: 12, color: "#34d399", fontWeight: 600, textAlign: "center" }}>🎉 All tasks done! Great work today.</div>}
        </div>
      )}

      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask()}
          placeholder="Add a study task... (press Enter)"
          style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, color: "#E6EDF3", fontSize: 14, padding: "11px 16px", outline: "none" }} />
        <button onClick={addTask} style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1)", border: "none", borderRadius: 12, color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, padding: "11px 20px" }}>+ Add</button>
      </div>

      {total > 0 && (
        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 6 }}>
            {[["all","All"],["pending","Pending"],["done","Done"]].map(([val,lbl]) => (
              <button key={val} onClick={() => setFilter(val)}
                style={{ background: filter===val?"rgba(139,92,246,0.2)":"rgba(255,255,255,0.04)", border:`1px solid ${filter===val?"rgba(139,92,246,0.5)":"rgba(255,255,255,0.08)"}`, borderRadius:8, color:filter===val?"#c4b5fd":"#8B949E", cursor:"pointer", fontSize:12, fontWeight:600, padding:"5px 12px" }}>
                {lbl}
              </button>
            ))}
          </div>
          {done > 0 && (
            <button onClick={clearCompleted} style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:8, color:"#fca5a5", cursor:"pointer", fontSize:12, fontWeight:600, padding:"5px 12px" }}>
              Clear Completed
            </button>
          )}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {sorted.length === 0 && (
          <div style={{ background: cardBg, border, borderRadius: 14, padding: "36px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>{filter==="done"?"✅":"📝"}</div>
            <div style={{ color: "#8B949E", fontSize: 14 }}>
              {filter==="done"?"No completed tasks yet.":filter==="pending"?"No pending tasks!":"No tasks yet. Add your first study task above."}
            </div>
          </div>
        )}
        <AnimatePresence>
          {sorted.map(task => {
            const overdue = isOverdue(task);
            return (
              <motion.div key={task.id} initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, x:40 }} transition={{ duration:0.2 }}
                style={{ background: task.done?"rgba(52,211,153,0.05)":overdue?"rgba(239,68,68,0.05)":cardBg, border:`1px solid ${task.done?"rgba(52,211,153,0.2)":overdue?"rgba(239,68,68,0.25)":"rgba(255,255,255,0.08)"}`, borderRadius:12, padding:"13px 16px", display:"flex", alignItems:"center", gap:12, transition:"all 0.25s" }}>
                <button onClick={() => toggleTask(task.id)}
                  style={{ width:22, height:22, borderRadius:6, border:`2px solid ${task.done?"#34d399":overdue?"#ef4444":"rgba(255,255,255,0.2)"}`, background:task.done?"rgba(52,211,153,0.2)":"transparent", cursor:"pointer", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {task.done && <span style={{ color:"#34d399", fontSize:13, fontWeight:700 }}>✓</span>}
                </button>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, color:task.done?"#484F58":"#E6EDF3", textDecoration:task.done?"line-through":"none", wordBreak:"break-word" }}>{task.text}</div>
                  <div style={{ display:"flex", gap:6, marginTop:4, flexWrap:"wrap", alignItems:"center" }}>
                    {overdue && <span style={{ background:"rgba(239,68,68,0.15)", border:"1px solid rgba(239,68,68,0.35)", borderRadius:5, color:"#fca5a5", fontSize:10, fontWeight:700, padding:"2px 7px" }}>⚠ Due: {formatDate(task.date)}</span>}
                    {task.done && <span style={{ background:"rgba(52,211,153,0.12)", border:"1px solid rgba(52,211,153,0.25)", borderRadius:5, color:"#6ee7b7", fontSize:10, fontWeight:600, padding:"2px 7px" }}>✓ Done</span>}
                    {!overdue && !task.done && <span style={{ color:"#484F58", fontSize:10 }}>Added {formatDate(task.date)}</span>}
                  </div>
                </div>
                <button onClick={() => deleteTask(task.id)}
                  style={{ background:"none", border:"none", color:"#484F58", cursor:"pointer", fontSize:16, padding:"4px", borderRadius:6, flexShrink:0, lineHeight:1 }}
                  onMouseEnter={e => e.target.style.color="#fca5a5"} onMouseLeave={e => e.target.style.color="#484F58"}>✕</button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {showHist && data.history.length > 0 && (
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} style={{ marginTop:24 }}>
          <div style={{ fontSize:12, fontWeight:600, color:"#8B949E", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Completed History</div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {[...data.history].reverse().map(t => (
              <div key={t.id+t.movedOn} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:10, padding:"10px 14px", display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ color:"#34d399", fontSize:13 }}>✓</span>
                <span style={{ flex:1, color:"#484F58", fontSize:13, textDecoration:"line-through", wordBreak:"break-word" }}>{t.text}</span>
                <span style={{ color:"#30363D", fontSize:11, flexShrink:0 }}>{formatDate(t.movedOn||t.date)}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// NAV
// ════════════════════════════════════════════════════════════════════════════
const NAV = [
  { id: "dashboard", label: "Dashboard",     icon: "⬡" },
  { id: "roadmap",   label: "A2Z Roadmap",   icon: "◈" },
  { id: "problems",  label: "Problems",       icon: "≡" },
  { id: "practice",  label: "🎲 Practice",   icon: "" },
  { id: "timer",     label: "⏱ Study Timer", icon: "" },
  { id: "planner",   label: "📅 Daily Planner", icon: "" },
];

// ════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [selected, setSelected] = useState(null);
  const [progress, setProgress] = useState(load);
  const [activity, setActivity] = useState(loadActivity);
  const [practice, setPractice] = useState(loadPractice);
  const [settings, setSettings] = useState(loadSettings);
  const [profile, setProfile] = useState(loadProfile);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => { save(progress); }, [progress]);
  useEffect(() => { saveActivity(activity); }, [activity]);
  useEffect(() => { savePractice(practice); }, [practice]);
  useEffect(() => { saveSettings(settings); }, [settings]);
  useEffect(() => { saveProfile(profile); }, [profile]);

  const updateProgress = (id, data) => setProgress(p => ({ ...p, [id]: { ...(p[id] || {}), ...data } }));
  const bumpActivityState = (dateKey, by = 1) => setActivity(a => bumpActivity(a, dateKey, by));
  const setDailyGoal = (n) => setSettings(s => ({ ...s, dailyGoal: Math.max(1, Math.min(50, n)) }));
  const navigate = (p) => { setPage(p); setSelected(null); setSidebarOpen(false); };

  const startQuickPractice = () => {
    const questions = generatePracticeSet(progress, { topic: "Any", difficulties: ["Any"], sources: [...STATUS_SOURCES], count: 5 });
    setPractice({ questionIds: questions.map(q => q.id), completed: {}, createdAt: todayKey(), filters: { topic: "Any", diffs: ["Any"], sources: [...STATUS_SOURCES], count: 5 } });
    navigate("practice");
  };

  const handleImport = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.progress) setProgress(data.progress);
        if (data.activity) setActivity(data.activity);
      } catch { alert("Invalid backup file."); }
    };
    reader.readAsText(file);
  };

  const solved = ALL_PROBLEMS.filter(p => ["Solved", "Revised"].includes(progress[p.id]?.status)).length;
  const total = ALL_PROBLEMS.length;
  const activePage = selected ? null : page;

  const initials = profile.name ? profile.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) : "?";

  const SidebarContent = () => (
    <>
      {/* Logo / header — clickable to open profile */}
      <button onClick={() => { setProfileOpen(true); setSidebarOpen(false); }}
        style={{ width: "100%", padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", borderBottom: "1px solid #21262D", cursor: "pointer", textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Avatar */}
          <div style={{
            width: 34, height: 34, borderRadius: 9, flexShrink: 0,
            background: `linear-gradient(135deg, ${profile.avatarColor}, ${profile.avatarColor}88)`,
            border: `1px solid ${profile.avatarColor}50`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 800, color: "#fff",
            boxShadow: `0 0 10px ${profile.avatarColor}30`,
          }}>
            {initials}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#E6EDF3", lineHeight: 1.3 }}>A2Z Revision Hub</div>
            <div style={{ fontSize: 10, color: "#8B949E" }}>Personal DSA Journey</div>
          </div>
        </div>
        <span style={{ color: "#484F58", fontSize: 10 }}>→</span>
      </button>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 3, position: "relative" }}>
        {NAV.map(({ id, label }) => {
          const active = activePage === id;
          return (
            <motion.button key={id} onClick={() => navigate(id)}
              whileHover={!active ? { x: 2 } : {}}
              transition={{ duration: 0.15, ease: "easeOut" }}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px 10px 10px", borderRadius: 7,
                position: "relative",
                color: active ? "#C4B5FD" : "#8B949E",
                border: "none",
                cursor: "pointer", fontSize: 14, fontWeight: active ? 600 : 400,
                textAlign: "left",
                background: "transparent",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#C9D1D9"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = "#8B949E"; }}>
              {active && (
                <motion.div
                  layoutId="sidebar-active-pill"
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: "absolute", inset: 0, borderRadius: 7,
                    background: "rgba(167,139,250,.15)",
                    borderLeft: "3px solid #A78BFA",
                    zIndex: 0,
                  }}
                />
              )}
              <span style={{ position: "relative", zIndex: 1, width: 7, height: 7, borderRadius: "50%", flexShrink: 0, background: active ? "#A78BFA" : "transparent", border: active ? "none" : "1px solid #484F58" }} />
              <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
            </motion.button>
          );
        })}
      </nav>

      {/* Stats footer */}
      <div style={{ padding: "14px 16px", borderTop: "1px solid #21262D", flexShrink: 0 }}>
        <div style={{ fontSize: 11, color: "#8B949E", marginBottom: 4 }}>Overall Progress</div>
        <div style={{ fontSize: 14, fontFamily: "monospace", color: "#E6EDF3", marginBottom: 6 }}>
          <span style={{ color: "#3FB950", fontWeight: 700 }}>{solved}</span>
          <span style={{ color: "#484F58" }}> / {total}</span>
        </div>
        <ProgressBar value={solved} max={total} color="#A78BFA" height={3} />
      </div>
    </>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100%", background: "#010409", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif", color: "#E6EDF3" }}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        html, body, #root { background:#010409; min-height:100vh; width:100%; }
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:#0D1117}
        ::-webkit-scrollbar-thumb{background:#30363D;border-radius:3px}
        select option{background:#161B22;color:#E6EDF3}
        a{text-decoration:none}
        button{font-family:inherit}
        input,textarea,select{font-family:inherit}
        .sidebar-desktop{display:flex}
        .main-offset{margin-left:210px}
        @media (max-width:700px){
          .sidebar-desktop{display:none!important}
          .main-offset{margin-left:0!important}
          .hamburger{display:flex!important}
          .two-col{grid-template-columns:1fr!important}
          .social-grid{grid-template-columns:1fr!important}
        }
        @media (prefers-reduced-motion:reduce){
          *{transition:none!important;animation:none!important}
        }
      `}</style>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        progress={progress}
        activity={activity}
        profile={profile}
        onSaveProfile={(p) => { setProfile(p); saveProfile(p); }}
      />

      {/* Desktop Sidebar */}
      <aside className="sidebar-desktop" style={{ width: 210, background: "#0D1117", borderRight: "1px solid #21262D", flexDirection: "column", flexShrink: 0, position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 30, overflowY: "auto" }}>
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.65)", zIndex: 40 }} />
          <aside style={{ position: "fixed", top: 0, left: 0, width: 220, height: "100vh", background: "#0D1117", borderRight: "1px solid #21262D", display: "flex", flexDirection: "column", zIndex: 50, overflowY: "auto", boxShadow: "4px 0 20px rgba(0,0,0,.5)" }}>
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 12px 0" }}>
              <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "1px solid #21262D", borderRadius: 6, color: "#8B949E", cursor: "pointer", padding: "4px 10px", fontSize: 14 }}>✕</button>
            </div>
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Main content */}
      <div className="main-offset" style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, background: "#010409", minHeight: "100vh" }}>
        {/* Topbar */}
        <header style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(1,4,9,.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #21262D", padding: "11px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <button className="hamburger" onClick={() => setSidebarOpen(true)}
            style={{ display: "none", alignItems: "center", justifyContent: "center", background: "none", border: "1px solid #21262D", borderRadius: 6, color: "#8B949E", cursor: "pointer", padding: "5px 8px", fontSize: 16, lineHeight: 1 }}>
            ☰
          </button>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#E6EDF3", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {selected ? selected.name : NAV.find(n => n.id === page)?.label}
          </span>
          {/* Profile button in topbar */}
          <button onClick={() => setProfileOpen(true)}
            style={{ width: 32, height: 32, borderRadius: 8, background: `${profile.avatarColor}18`, border: `1px solid ${profile.avatarColor}40`, color: "#E6EDF3", fontSize: 11, fontWeight: 800, cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {initials}
          </button>
          <span style={{ fontSize: 12, color: "#8B949E", fontFamily: "monospace", flexShrink: 0 }}>
            <span style={{ color: "#3FB950" }}>{solved}</span>
            <span style={{ color: "#484F58" }}> / {total}</span>
          </span>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
          {selected
            ? <ProblemDetail problem={selected} progress={progress} onBack={() => setSelected(null)} onUpdate={updateProgress} onActivity={bumpActivityState} />
            : page === "dashboard" ? <Dashboard progress={progress} activity={activity} settings={settings} onSetDailyGoal={setDailyGoal} onNavigate={navigate} onImport={handleImport} onSelectProblem={p => setSelected(p)} onQuickPractice={startQuickPractice} />
              : page === "roadmap" ? <Roadmap progress={progress} onSelectProblem={p => setSelected(p)} />
                : page === "problems" ? <ProblemList progress={progress} onSelect={p => setSelected(p)} />
                  : page === "practice" ? <PracticeMode progress={progress} practice={practice} setPractice={setPractice} onSelectProblem={p => setSelected(p)} />
                    : page === "timer" ? <StudyTimer onBumpActivity={() => bumpActivityState(todayKey())} />
                    : page === "planner" ? <DailyPlanner />
                    : null
          }
        </main>
      </div>
    </div>
  );
}
