/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Review } from '../types';
import { INITIAL_REVIEWS } from '../data';
import { Star, MessageSquare, Plus, Check, StarOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [hoveredStars, setHoveredStars] = useState<number | null>(null);
  
  // Form State
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [success, setSuccess] = useState(false);

  // Load reviews on Mount (and read custom ones from local storage)
  useEffect(() => {
    const local = localStorage.getItem('burger_bistro_reviews');
    if (local) {
      try {
        const customReviews = JSON.parse(local) as Review[];
        setReviews([...customReviews, ...INITIAL_REVIEWS]);
      } catch (err) {
        setReviews(INITIAL_REVIEWS);
      }
    } else {
      setReviews(INITIAL_REVIEWS);
    }
  }, []);

  // Calculate dynamic average
  const totalReviewsCount = reviews.length;
  const averageRating = totalReviewsCount > 0 
    ? parseFloat((reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviewsCount).toFixed(1))
    : 0;

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    // Split tags by comma
    const parsedTags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newReview: Review = {
      id: `r-custom-${Date.now()}`,
      author: authorName,
      rating,
      comment,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      tags: parsedTags.length > 0 ? parsedTags : undefined,
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    // Save custom ones specifically to localStorage
    const local = localStorage.getItem('burger_bistro_reviews');
    let customList: Review[] = [];
    if (local) {
      try {
        customList = JSON.parse(local) as Review[];
      } catch (e) {}
    }
    customList.unshift(newReview);
    localStorage.setItem('burger_bistro_reviews', JSON.stringify(customList));

    // Reset Form
    setAuthorName('');
    setRating(5);
    setComment('');
    setTagInput('');
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setIsFormOpen(false);
    }, 1800);
  };

  return (
    <section id="reviews" className="py-20 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 font-sans">
            Sizzling Reviews
          </h2>
          <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-stone-600 mt-4 text-sm sm:text-base font-sans">
            Don't just take our word for it. Hear what our local food critics and community lovers have to say about our juicy sears.
          </p>
        </div>

        {/* Overview Stats Bar & Call To Action */}
        <div className="bg-stone-50 border border-stone-150 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          
          {/* Average metrics */}
          <div className="flex items-center gap-4">
            <div className="text-center md:text-left">
              <span className="text-4xl sm:text-5xl font-black text-stone-900 font-mono tracking-tight">{averageRating}</span>
              <span className="text-xs text-stone-400 font-bold block mt-1">OUT OF 5.0 RATINGS</span>
            </div>
            
            <div className="h-12 w-[1px] bg-stone-200 hidden sm:block" />

            <div>
              <div className="flex gap-0.5 mb-1 justify-center md:justify-start">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star 
                    key={s} 
                    className={`w-5 h-5 ${
                      s <= Math.round(averageRating) 
                        ? 'text-amber-400 fill-amber-400' 
                        : 'text-stone-200'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-stone-500 font-medium">Based on {totalReviewsCount} verified customer reviews</span>
            </div>
          </div>

          {/* Trigger button */}
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="w-full md:w-auto px-6 py-3.5 bg-stone-900 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-stone-950/5"
          >
            <Plus className="w-4 h-4" />
            Write A Review
          </button>
        </div>

        {/* Expandable Review Form */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <form 
                onSubmit={handleReviewSubmit}
                className="bg-stone-50 border border-stone-200 p-6 sm:p-8 rounded-3xl space-y-5 max-w-3xl mx-auto"
              >
                <h3 className="font-extrabold text-lg text-stone-900 font-sans tracking-tight mb-2">
                  Share Your Dining Experience
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Author Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-stone-600 uppercase font-mono tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. Arthur Pendragon"
                      className="bg-white border border-stone-200 px-4 py-2.5 rounded-xl font-medium text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    />
                  </div>

                  {/* Star Selector Input */}
                  <div className="flex flex-col gap-1.5 justify-center">
                    <label className="text-xs font-bold text-stone-600 uppercase font-mono tracking-wider mb-1">Your Rating</label>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isGold = hoveredStars !== null ? star <= hoveredStars : star <= rating;
                        return (
                          <button
                            type="button"
                            key={star}
                            onClick={() => handleStarClick(star)}
                            onMouseEnter={() => setHoveredStars(star)}
                            onMouseLeave={() => setHoveredStars(null)}
                            className="p-1 hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Star 
                              className={`w-6 h-6 ${
                                isGold 
                                  ? 'text-amber-400 fill-amber-400' 
                                  : 'text-stone-300'
                              }`} 
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Comment area */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-stone-600 uppercase font-mono tracking-wider">Review Comments</label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="How was the sear? The bun fluffiness? The service?"
                    className="bg-white border border-stone-200 px-4 py-2.5 rounded-xl font-medium text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none"
                  />
                </div>

                {/* Tags entry */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-stone-600 uppercase font-mono tracking-wider">Review Tags (Optional)</label>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="e.g. Spicy Chicken, Vanilla Milkshake, Crispy (comma separated)"
                    className="bg-white border border-stone-200 px-4 py-2.5 rounded-xl font-medium text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  />
                </div>

                {/* Submit bar */}
                <div className="flex items-center justify-end pt-2">
                  <button
                    type="submit"
                    disabled={success}
                    className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                      success 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-stone-900 hover:bg-amber-500 text-white shadow-md'
                    }`}
                  >
                    {success ? (
                      <>
                        <Check className="w-4.5 h-4.5" />
                        Review Published!
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-4 h-4" />
                        Publish Review
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials Review Wall */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-stone-50 border border-stone-150 p-6 rounded-2xl flex flex-col justify-between shadow-xs hover:border-stone-250 hover:shadow-sm transition-all duration-300"
            >
              <div>
                {/* Rating & Date */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= rev.rating 
                            ? 'text-amber-400 fill-amber-400' 
                            : 'text-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-stone-400 font-medium font-sans">{rev.date}</span>
                </div>

                {/* Content */}
                <p className="text-stone-700 text-xs sm:text-sm font-sans leading-relaxed mb-6 italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Tags */}
              <div className="pt-4 border-t border-stone-200/60 flex flex-col gap-2">
                <span className="font-extrabold text-sm text-stone-900 font-sans tracking-tight">
                  {rev.author}
                </span>

                {/* Tag chips */}
                {rev.tags && rev.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {rev.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-white text-stone-500 border border-stone-200 text-[9px] font-bold font-mono tracking-wider uppercase rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
